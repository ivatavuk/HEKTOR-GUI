import React from "react";

export default React.createContext({
    ros:null,
    isConnected:false,
    url:null,
    robotId:null,
    setConnection: (isConnected)=>{},
    setUrl: (url)=>{},
    setRobotId: (robotId)=>{}
});