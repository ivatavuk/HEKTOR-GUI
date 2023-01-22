import React, { useEffect, useContext, useState } from "react";
import { Viewer } from '@techming/web-video-canvas';
import Container from 'react-bootstrap/Container'
import RosContext from "../context/ros-context";
import AuthContext from "../context/auth-context";

function VideoStream(props) {
    const contextRos = useContext(RosContext);
    const contextType = useContext(AuthContext);

    useEffect(() => {
        const url = contextRos.url;
        //get IPV4 from url where url can be (ws://164.26.24.1:9090)
        const IPv4 = url.split(":")[1].split("//")[1];
        const topicName = props.videoFeed[0].topicName;
        const topicNameSplit = topicName.split("/");

        if (topicNameSplit[topicNameSplit.length - 1] === "compressed") {
            //remove compressed form topic name
            topicNameSplit.pop(topicNameSplit.length - 1);
            //reconstruct topic name
            const name = topicNameSplit.join('/');

            props.videoFeed[1] = new Viewer({
                divID: props.videoFeed[0]._id,
                host: IPv4,
                port: '9000',
                width: document.getElementById('VideoFeedCol0').offsetWidth - 51,
                height: 400,
                topic: name,
                type: 'ros_compressed',

            });
        } else {
            props.videoFeed[1] = new Viewer({
                divID: props.videoFeed[0]._id,
                host: IPv4,
                port: '9000',
                width: document.getElementById('VideoFeedCol0').offsetWidth - 51,
                height: 400,
                topic: topicName,
            });
        }

        return () => {
            // When deleting the video feed window we have to remove the 
            // canvas where the video feed is displayed manulay.
            props.videoFeed[1].canvas.remove();
            props.videoFeed[1].unmount();
        };

    }, [props.videoFeed]);

    //Set width of canvas
    useEffect(()=>{
        props.videoFeed[1].canvas.width = props.width; 
        props.videoFeed[1].width =  props.width; 

        props.videoFeed[1].canvas.height = props.height;
        props.videoFeed[1].height = props.height;

    },[props.width]);


    const handleDelete = async (event) => {
        event.preventDefault();
        const videoFeedID = props.videoFeed[0]._id;

        const requestBody = {
            query: `
                mutation{
                    deleteVideoFeed(video_feed_id:"${videoFeedID}"){
                    topicName
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
                props.removeVideoFeedFromList(videoFeedID);
            }
        } catch (err) {
            throw err;
        }

    }

    return (
        <Container className='text-light bg-dark rounded'>
            <div style={{
                "display": "inline-flex",
                "flexWrap": "nowrap",
                "justifyContent": "space-between",
                "width": "100%",
                "alignItems": "center"
            }}>
                <h5>{props.videoFeed[0].windowName}</h5>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDelete} width="16" height="16" fill="red" className="bi bi-x-circle-fill" style={{ "float": "right" }} viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </div>

            <div id={props.videoFeed[0]._id}>
            </div>
        </Container>
    );
}

export default VideoStream;