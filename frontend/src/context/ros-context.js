import React from "react";

export default React.createContext({
    ros:null,
    isConnected:false,
    url:null,
    setConnection: (isConnected)=>{},
    setUrl: (url)=>{}
});