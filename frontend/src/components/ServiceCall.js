import React, {useContext, useEffect} from "react";
import ROSLIB from 'roslib';
import RosContext from "../context/ros-context";

function ServiceCall(props){
    const contextRos = useContext(RosContext);
    const service_name = "/turtle1/teleport_relative";
    const service_type = "turtlesim/TeleportRelative";
    const service_payload = {
        "linear": 1,
        "angular": 0
    };

    //create service
    let NewService = new ROSLIB.Service({
        ros: contextRos.ros,
        name: service_name,
        type: service_type
    });

    //create service request
    let request = new ROSLIB.ServiceRequest(service_payload);
    //call service
    useEffect(()=>{
        NewService.callService(request,(response)=>{console.log(response)},(error)=>{console.log(error)});
    },[]);

}

export default ServiceCall;

