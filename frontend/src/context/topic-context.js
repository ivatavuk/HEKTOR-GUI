import React from "react";

export default React.createContext({
    topics:null,
    topicTypes:false,
    selectedTopic:null,
    selectedType:null,
    setSelectedType: (topicType)=>{},
    setTopics: (topics)=>{},
    setTopicTypes: (topicTypes)=>{},
    setSelectedTopic: (selectedTopic)=>{}
});