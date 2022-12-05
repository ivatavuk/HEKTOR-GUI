import React, { useContext, useState, useEffect} from 'react';
import RosContext from "../context/ros-context";


function EchoTopic() {
  const [topics, setTopics] = useState([]);
  const contextRos = useContext(RosContext);

  useEffect(()=>{
    //Get topics every 200 ms
    //see if this effects performanse in long run??

    const interval = setInterval(() => {
      contextRos.ros.getTopics(function(t) {
        setTopics(t.topics);
      })
    }, 200);
    return () => clearInterval(interval);
    }, []);

  

  return (

      topics.map(function(topic){
        return <div>{topic}</div>; 
      })
  );
    
}

export default EchoTopic;