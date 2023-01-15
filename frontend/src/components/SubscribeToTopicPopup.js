import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TopicDropdown from './TopicDropdown';
import TopicContext from '../context/topic-context';
import AuthContext from '../context/auth-context';
import RosContext from '../context/ros-context';
import ROSLIB from 'roslib';


function SubscribeToTopicPopup(props) {

    const contextTopic = useContext(TopicContext);
    const contextType = useContext(AuthContext);
    const contextRos = useContext(RosContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const robotId = contextRos.robotId;
        const topicType = contextTopic.selectedType;
        const topicValue = event.target.topicValue.value;
        const topicName = contextTopic.selectedTopic;
        const topicLable = event.target.topicLable.value;
        const isGraphData = event.target.isGraphData.checked;

        if (robotId.length === 0 ||
            topicType.length === 0 ||
            topicValue.trim().length === 0 ||
            topicName.length === 0 ||
            topicLable.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                mutation{
                    createTopic(topic_input:{
                    robotId:"${robotId}"
                    topicName: "${topicName}"
                    topicType:"${topicType}"
                    topicLable:"${topicLable}"
                    topicValue:"${topicValue}"
                    isGraphData: ${isGraphData}
                     }){
                        topicName
                        topicType
                        topicLable
                        topicValue
                        isGraphData
                        _id
                    }
                }
            `
        };

        const token = contextType.token;
        let submitData;
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
                submitData = await res.json();
                if (submitData) {
                    const value = " ";
                    const topic = submitData.data.createTopic;
                    const rosTopic = new ROSLIB.Topic({
                        ros: contextRos.ros,
                        name: topic.topicName,
                        messageType: topic.topicType
                    })
                    props.addTopicToList([rosTopic, topic, value]);
                }
            }
        } catch (err) {
            throw err;
        }

        //reset selected topic
        contextTopic.setSelectedTopic(null);
        //close window
        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Subscribe to topic</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3 w-100" style={{ "display": "inline-flex", "justifyContent": "space-between" }}>
                        <Form.Label>Select a topic</Form.Label>
                        <TopicDropdown className="float-right" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="topicValue">
                        <Form.Label>Topic value to display</Form.Label>
                        <Form.Control type="input" placeholder="battery_voltage" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="topicLable">
                        <Form.Label>Topic lable</Form.Label>
                        <Form.Control type="input" placeholder="battery status" />
                    </Form.Group>
                    <Form.Check
                        type='checkbox'
                        id={`isGraphData`}
                        label={`Generate real time graph`}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Subscribe
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default SubscribeToTopicPopup;