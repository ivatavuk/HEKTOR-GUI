import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import React, { useState, useContext, useEffect } from 'react';
import SubscribeToTopicPopup from '../components/SubscribeToTopicPopup';
import StatusWindowField from './StatusWindowField';
import AuthContext from '../context/auth-context';
import RosContext from '../context/ros-context';
import ROSLIB from 'roslib';
import './StatusWindow.css';


function StatusWindow(props) {
  const contextType = useContext(AuthContext);
  const contextRos = useContext(RosContext);

  useEffect(() => {
    fetchTopics();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTopicToList = (topic) => {
    props.setTopicList([
      ...props.topicList,
      topic
    ]);
  }

  const removeTopicFromList = (topicId) => {
    let filteredArray = props.topicList.filter(function (topic) { 
      return topic[1]._id !== topicId
    });
    props.setTopicList(filteredArray);
  }

  const fetchTopics = async () => {
    const requestBody = {
      query: `
          query{
              topics{
                _id
                topicName
                topicType
                topicLable
                topicValue
                robotId
                isGraphData
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
        let data = await res.json();
        if (data) {
          //value recieved on subscription
          const value = " ";
          //topics of the connected robot
          const filteredTopics = data.data.topics.filter(function (topic) { return topic.robotId === contextRos.robotId });
          //create an array of objects
          const listOfROSTopics = filteredTopics.map(function (topic) {
            //ako je topic namjenjen za plotanje, postaviI isGraphData na true
            //kako bi se prikazao GraphWindow
            if(topic.isGraphData){
                props.setIsGraphData(true);
            }

            return [new ROSLIB.Topic({
              ros: contextRos.ros,
              name: topic.topicName,
              messageType: topic.topicType
            }),
              topic,
              value
            ]
          });
          props.setTopicList(listOfROSTopics);
        }
      }
    } catch (err) {
      throw err;
    }
  }


  return (
    <Container className='text-light bg-dark rounded' >
      <h5>Status window</h5>
      {
        props.topicList.map(function (topic, index) {
          return (<StatusWindowField key={index} topic={topic} removeTopicFromList={removeTopicFromList} />);
        })
      }
      <br />
      <Button onClick={handleShow} >Add Topic</Button>
      <SubscribeToTopicPopup handleClose={handleClose} show={show} addTopicToList={addTopicToList} />

    </Container>
  );

}

export default StatusWindow;