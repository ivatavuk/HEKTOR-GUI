import React,{useContext} from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import AuthContext from '../context/auth-context';
import RosContext from "../context/ros-context";
import ConnectToROS from "./ConnectToROS";

function RobotCard(props){
    const contextType = useContext(AuthContext);
    const contextRos = useContext(RosContext);


    const CloseCard = async (event) =>{
        event.preventDefault();
        const robotId = props.robot._id;

        const requestBody = {
            query: `
                mutation{
                    deleteRobot(robot_id:"${robotId}"){
                        _id
                    }
                }
            `
        };

        const token = contextType.token;

        try{
            const res = await fetch("http://localhost:8000/graphql",{
                method: "POST",
                body: JSON.stringify(requestBody),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if(res.status !== 200 && res.status !== 201){
                throw new Error("Faild!");
            }else{
                props.removeRobotFromList(robotId);
            }
        }catch(err){
            throw err;
        }   
    }

    return(
        <Col>
            <Card style={{ width: '18rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill float-right" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" color={contextRos.isConnected && contextRos.robotId === props.robot._id ? "green" : "red"}/>
                </svg>
                <CloseButton className="position-absolute top-0 end-0" onClick={CloseCard}/>
                <Card.Body>
                    <Card.Title>{props.robot.name}</Card.Title>
                    <Card.Text>
                       <span>IPv4: {props.robot.IPv4}</span>
                    </Card.Text>
                    <ConnectToROS robot={props.robot} />                    
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RobotCard;