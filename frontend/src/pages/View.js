import Container from 'react-bootstrap/Container'
import React, { useContext, useState, useEffect } from 'react';
import StatusWindow from '../components/StatusWindow';
import RosContext from "../context/ros-context";
import TopicContext from '../context/topic-context';
import AuthContext from '../context/auth-context';
import './Main.css';


function ViewPage() {
    const contextRos = useContext(RosContext);

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
                <StatusWindow />
            </TopicContext.Provider>
        </Container>
    );
}

export default ViewPage;