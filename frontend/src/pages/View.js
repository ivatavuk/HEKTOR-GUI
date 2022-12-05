import React,{Component} from "react";
import EchoTopic from "../components/EchoTopic";
import './Main.css';
 

class ViewPage extends Component{
    render(){
        return (
            <div className="page-position">
                <EchoTopic/>
            </div>
        );
    }
}

export default ViewPage;