import React,{useContext} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import AuthContext from '../context/auth-context';


function RobotCard(props){
    const contextType = useContext(AuthContext);

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
                <CloseButton className="position-absolute top-0 end-0" onClick={CloseCard}/>
                <Card.Body>
                    <Card.Title>{props.robot.name}</Card.Title>
                    <Card.Text>
                        IPv4: {props.robot.IPv4}
                    </Card.Text>
                    <Button variant="primary">Connect</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RobotCard;