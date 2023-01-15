import React, { useContext, useEffect } from "react";
import RosContext from "../context/ros-context";
import AuthContext from "../context/auth-context";

function StatusWindowField (props) {
    const contextType = useContext(AuthContext);

    useEffect(() => {
        const callbackFunction = (message) =>{
            let arrOfValues = props.topic[1].topicValue.split(' ');
            let object = message;
    
            for(const i in arrOfValues){
                object = object[arrOfValues[i]];
            }
            //if can be converted to number 
            //tu dodaj da ga konvertas samo ako mora ic u graph data.
            if(Number(object)){
                props.topic[2] =  Number(object).toFixed(2); //Number shows only 2 decimal places
            }else{
                props.topic[2] = object;
            }
         };
    
        props.topic[0].subscribe(callbackFunction);

        return ()=>{
           props.topic[0].unsubscribe(callbackFunction);
        }
      }, [props.topic]);

    const handleDelete = async (event) =>{
        event.preventDefault();

        const topicId = props.topic[1]._id;

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
            <span>{props.topic[1].topicLable}</span>
            <span style={{ "marginLeft": "20px" }}> {props.topic[2]} </span>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDelete} width="16" height="16" fill="red" className="bi bi-x-circle-fill" style={{"float":"right"}} viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
        </div>
    );
}

export default StatusWindowField;