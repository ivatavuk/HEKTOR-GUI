import React, {useContext, useState} from "react";
import RosContext from "../context/ros-context";
import Button from 'react-bootstrap/Button';

function ConnectToROS(props){
    const contextRos = useContext(RosContext);
    const [robotUrl, setRobotUrl] = useState();

    contextRos.ros.on('connection', () => {
        contextRos.setConnection(true);
        contextRos.setUrl(robotUrl);
        contextRos.setRobotId(props.robot._id);
    });

    contextRos.ros.on('close', function() {
        contextRos.setConnection(false);
        contextRos.setUrl(" ");
        contextRos.setRobotId(" ");
    });

    const handleConnect = (event) =>{
        event.preventDefault();
        
        if(contextRos.isConnected){
            return;
        }
        const robotIPv4 = props.robot.IPv4;
        setRobotUrl("ws://"+robotIPv4+":9090");

        contextRos.ros.connect(robotUrl);
    }
    
    const handleClose = (event) =>{
        event.preventDefault();
        if(contextRos.url === "ws://"+props.robot.IPv4+":9090"){
            contextRos.ros.close();
        }
    }

    return(
        contextRos.isConnected && contextRos.robotId === props.robot._id ? 
        <Button variant="danger" onClick={handleClose}>Disconnect</Button>
        :
        <Button variant="success" onClick={handleConnect}>Connect</Button>   
    );
}

export default ConnectToROS;