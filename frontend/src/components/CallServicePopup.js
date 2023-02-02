import React, {useContext} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import ROSLIB from 'roslib';
import RosContext from "../context/ros-context";

function CallServicePopup(props) {
    const contextRos = useContext(RosContext);


    const handleSubmit = (event) =>{
        event.preventDefault();
        const service_name = event.target.serviceName.value;
        const service_type = event.target.serviceType.value;
        const service_payload = JSON.parse(event.target.serviceArguments.value);
        //create service
        let NewService = new ROSLIB.Service({
            ros: contextRos.ros,
            name: service_name,
            type: service_type
        });

        //create service request
        let request = new ROSLIB.ServiceRequest(service_payload);
        //call service
        NewService.callService(request,(response)=>{console.log(response)},(error)=>{console.log(error)});

        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                   Call Service
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="serviceName">
                        <Form.Label>Service name</Form.Label>
                        <Form.Control type="input" placeholder="/turtle1/teleport_relative" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="serviceType">
                        <Form.Label>Service type</Form.Label>
                        <Form.Control type="input" placeholder="turtlesim/TeleportRelative" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="serviceArguments">
                        <Form.Label>Service arguments</Form.Label>
                        <Form.Control type="input" placeholder="{ 'linear':1, 'angular':0 }" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Call Service
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CallServicePopup;