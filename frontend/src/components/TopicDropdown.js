import Dropdown from 'react-bootstrap/Dropdown';
import React, {useContext, useState} from 'react';
import TopicContext from '../context/topic-context';



function TopicDropdown(props) {

    const contextTopic = useContext(TopicContext);
    const [topic, setTopic] = useState();

    const handleTopicSelect = (event) =>{
        event.preventDefault();
        setTopic(event.target.innerText);
        contextTopic.setSelectedTopic(event.target.innerText);
        contextTopic.setSelectedType(contextTopic.topicTypes[event.target.id]);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                { topic ? topic  : "ROS topics"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {contextTopic.topics.map(function (topic, index) {
                    return <Dropdown.Item id={index} key={index} onClick={handleTopicSelect}>{topic}</Dropdown.Item>;
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TopicDropdown;