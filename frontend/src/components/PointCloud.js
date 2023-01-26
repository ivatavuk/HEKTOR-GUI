import {React, useEffect, useContext} from 'react';
import RosContext from "../context/ros-context"; 
import {Viewer, PointCloud2} from 'ros3d';
import { TFClient } from 'roslib';
import Container from 'react-bootstrap/Container'
import AuthContext from "../context/auth-context";

function PointCloud(props){
    const contextRos = useContext(RosContext);
    const contextType = useContext(AuthContext);

    useEffect(()=>{
        //main viewer
        props.pointCloud[1] = new Viewer({
            divID : props.pointCloud[0]._id,
            antialias : true,
            height: 400,
            width: 500,
        });
            // Setup a client to listen to TFs.
        let tfClient = new TFClient({
            ros : contextRos.ros,
            angularThres : 0.001,
            transThres : 0.001,
            rate : 10.0,  
            fixedFrame : '/rslidar'
        });
        let cloudClient = new PointCloud2({
            ros: contextRos.ros,
            tfClient: tfClient,
            rootObject: props.pointCloud[1].scene,
            topic: props.pointCloud[0].topicName,
            max_pts: 500000,
            material: { size: 0.05, color: 0xff00ff }
        });
    },[]);

    // Dynamicly change width and height
    useEffect(()=>{
        props.pointCloud[1].resize(props.width,props.height);
    },[props.width]);

    const handleDelete = async (event)=>{
        event.preventDefault();
        const pointCloudID = props.pointCloud[0]._id;

        const requestBody = {
            query: `
                mutation{
                    deleteDataStream(data_stream_id:"${pointCloudID}"){
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
                props.removePointCloudFromList(pointCloudID);
            }
        } catch (err) {
            throw err;
        }

    }

    return(
        <Container className='text-light bg-dark rounded'> 
            <div className="data_stream_display_style">
                <h5>{props.pointCloud[0].windowName}</h5>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDelete} width="16" height="16" fill="red" className="bi bi-x-circle-fill" style={{ "float": "right" }} viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </div>
            <div id={props.pointCloud[0]._id}>
            </div>
        </Container>
    );
}

export default PointCloud;