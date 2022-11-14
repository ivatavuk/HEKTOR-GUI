import React,{Component} from "react";
import EchoTopic from "../components/EchoTopic";
import ToggleConnect from "../components/ToggleConnect";
import {ROS} from 'react-ros';
 

class StatusPage extends Component{
    render(){
        return (
            <ROS>
                <ToggleConnect/>
                <EchoTopic/>
            </ROS>
        );
    }
}

export default StatusPage;