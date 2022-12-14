import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import React, { useState, useContext, useEffect } from 'react';
import SubscribeToTopicPopup from '../components/SubscribeToTopicPopup';
import StatusWindowField from './StatusWindowField';
import AuthContext from '../context/auth-context';


function StatusWindow(props) {
  const contextType = useContext(AuthContext);
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    displayTopics();
  }, [topicList]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTopicToList = (topic) => {
    console.log(topic);
    setTopicList([
      ...topicList,
      topic
    ]);
  }

  const removeTopicFromList = (topicId) =>{
    let filteredArray = topicList.filter(function(topic) { return topic._id !== topicId });
    setTopicList(filteredArray);
  }

  const displayTopics = () =>{
    return topicList.map(function (topic) {
      return (<StatusWindowField topic={topic} removeTopicFromList={removeTopicFromList} />);
    })
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
          setTopicList(data.data.topics);
        }
      }
    } catch (err) {
      throw err;
    }
  }


  return (
    <Container className='text-light bg-dark rounded' style={{
      "width": "30%",
      "float": "left"
    }}>
      <h5>Status window</h5>

      {displayTopics()}

      <br />
      <Button onClick={handleShow} >Add Topic</Button>
      <SubscribeToTopicPopup handleClose={handleClose} show={show} addTopicToList={addTopicToList} />
    </Container>
  );

}

export default StatusWindow;