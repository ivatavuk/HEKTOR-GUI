import Container from 'react-bootstrap/Container'
import React, { useContext, useState, useEffect } from 'react';
import StatusWindow from '../components/StatusWindow';
import RosContext from "../context/ros-context";
import TopicContext from '../context/topic-context';
import GraphWindow from '../components/GraphWindow';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import './Main.css';


function ViewPage() {
    const contextRos = useContext(RosContext);
    // A list of objects containing ROS topic, topic data, value recieved after subscribing and a boolean
    // value describing if the topic is ment for plotting.
    const [topicList, setTopicList] = useState([]);
    //Hook used to check if there is at least one topic ment for ploting
    const [isGraphData, setIsGraphData] = useState(false);
    const [topics, setTopics] = useState([]);
    const [topicTypes, setTopicTypes] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedType, setSelectedType] = useState();

    const SetTopics = (topics) => {
        setTopics(topics);
    };

    const SetTopicTypes = (topicTypes) => {
        setTopicTypes(topicTypes);
    }

    const SetSelectedTopic = (selectedTopic) => {
        setSelectedTopic(selectedTopic);
    }

    const SetSelectedType = (selectedType) => {
        setSelectedType(selectedType);
    }

    //svaki put kada se izmjeni lista topica pogledaj ako postoji topic za prikaz plotanja
    //ako postoji setiraj isGraphData na true ako ne postoji niti jeda setaj na false
    useEffect(()=>{
        let isAnyTopicGraphData = false;
        topicList.map((data)=>{
            if(data[1].isGraphData){
                isAnyTopicGraphData = true;
            }
        });
        if(isAnyTopicGraphData){
            setIsGraphData(true);
        }else{
            setIsGraphData(false);
        }
    },[topicList]);

    useEffect(() => {
        //Get topics every 200 ms
        //see if this effects performanse in long run??
        const interval = setInterval(() => {
            contextRos.ros.getTopics(function (t) {
                SetTopics(t.topics);
                SetTopicTypes(t.types);
            })
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="page-position h-100">
            <TopicContext.Provider value={{
                topics: topics,
                topicTypes: topicTypes,
                selectedTopic: selectedTopic,
                selectedType: selectedType,
                setSelectedType: SetSelectedType,
                setTopics: SetTopics,
                setTopicTypes: SetTopicTypes,
                setSelectedTopic: SetSelectedTopic
            }}>
                <Row xs={1} md={2} lg={2}>
                    <Col>
                        <StatusWindow topicList={topicList} setIsGraphData={setIsGraphData} setTopicList={setTopicList} />
                    </Col>
                    {//Show graph only when graph data available.
                    isGraphData &&
                    <Col>
                        <GraphWindow topicList={topicList}></GraphWindow>
                    </Col>}
                </Row>

            </TopicContext.Provider>
        </Container>
    );
}

export default ViewPage;