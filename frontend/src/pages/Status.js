import React,{Component} from "react";
import EchoTopic from "../components/EchoTopic";
import ToggleConnect from "../components/ToggleConnect";
import {ROS} from 'react-ros';
import './Main.css';
 

class StatusPage extends Component{
    render(){
        return (
            <div className="page-position">
            <ROS>
                <ToggleConnect/>
                <EchoTopic/>
            </ROS>
            </div>
        );
    }
}

export default StatusPage;