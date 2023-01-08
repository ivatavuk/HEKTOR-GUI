import React, { useState, useContext } from "react";
import AuthContext from '../context/auth-context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import TopicDropdown from './TopicDropdown';

function AddVideoFeedPopup(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();

        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Video Feed</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                    <Form.Group className="mb-3 w-100" style={{ "display": "inline-flex", "justify-content": "space-between" }}>
                        <Form.Label>Select a topic</Form.Label>
                        {/* <TopicDropdown className="float-right" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="topicValue">
                        <Form.Label>Topic value to display</Form.Label>
                        <Form.Control type="input" placeholder="battery_voltage" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="topicLable">
                        <Form.Label>Window name</Form.Label>
                        <Form.Control type="input" placeholder="battery status" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Add video feed
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddVideoFeedPopup;