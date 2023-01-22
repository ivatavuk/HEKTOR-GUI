import React, { useState, useContext } from "react";
import AuthContext from '../context/auth-context';
import RosContext from "../context/ros-context";
import TopicContext from "../context/topic-context";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import TopicDropdown from './TopicDropdown';

function AddVideoFeedPopup(props) {
    const contextType = useContext(AuthContext);
    const contextRos = useContext(RosContext);
    const contextTopic = useContext(TopicContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const topicName = contextTopic.selectedTopic;
        const robotId = contextRos.robotId;
        const windowName = event.target.windowName.value;

        console.log(topicName,robotId,windowName);

        if(topicName.trim().length === 0 ||
        robotId.trim().length === 0 ||
        windowName.trim().length === 0){
            return;
        }

        //Save video feed to DB and add to videofeedlist
        const requestBody = {
            query: `
                mutation {
                    createVideoFeed(video_feed:{
                        topicName:"${topicName}"
                        windowName:"${windowName}"
                   	    robotId: "${robotId}"
                   }){
                     _id
                     topicName
                     windowName
                     robotId
                   }
                 }
            `
        };

        const token = contextType.token;

        try {
            const res = await fetch("http://localhost:8000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Faild!");
            } else {
                const submitData= await res.json();
                // Dodaj polje viewera prije nego sta dodas u listu video feeda
                let viewer = {};
                let VideoFeedObject = [submitData.data.createVideoFeed, viewer];          
                props.addVideoFeedToList(VideoFeedObject);
            }
        } catch (err) {
            throw err;
        }

        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Video Feed</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                    <Form.Group className="mb-3 w-100" style={{ "display": "inline-flex", "justifyContent": "space-between" }}>
                        <Form.Label>Select a topic</Form.Label>
                        <TopicDropdown className="float-right" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="windowName">
                        <Form.Label>Window name</Form.Label>
                        <Form.Control type="input" placeholder="Front camera" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Add video feed
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddVideoFeedPopup;