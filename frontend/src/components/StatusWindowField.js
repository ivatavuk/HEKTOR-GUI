import React, { useContext, useState, useEffect } from "react";
import ROSLIB from 'roslib';
import RosContext from "../context/ros-context";
import AuthContext from "../context/auth-context";

/* BUG while deleting/removing topic */
function StatusWindowField (props) {
    const [value, setValue] = useState("");
    const contextRos = useContext(RosContext);
    const contextType = useContext(AuthContext);

    const callbackFunction = (message) =>{
        let arrOfValues = props.topic.topicValue.split(' ');
        let object = message;

        for(const i in arrOfValues){
            object = object[arrOfValues[i]];
        }
        
        setValue(object);
    };

    useEffect(() => {
        const topic = new ROSLIB.Topic({
            ros: contextRos.ros,
            name: props.topic.topicName,
            messageType: props.topic.topicType
        });
    
        topic.subscribe(callbackFunction);
      
        // returned function will be called on component unmount 
        return () => {
          topic.unsubscribe(callbackFunction);
        }
      }, []);

    const handleDelete = async (event) =>{
        event.preventDefault();

        const topicId = props.topic._id;

        const requestBody = {
            query: `
                mutation{
                    deleteTopic(topic_id:"${topicId}"){
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
                props.removeTopicFromList(topicId);
            }
        }catch(err){
            throw err;
        }   
        
    }

    return (
        <div>
            <span>{props.topic.topicLable}</span>
            <span style={{ "margin-left": "20px" }}>{value}</span>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDelete} width="16" height="16" fill="red" class="bi bi-x-circle-fill" style={{"float":"right"}} viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
        </div>
    );
}

export default StatusWindowField;