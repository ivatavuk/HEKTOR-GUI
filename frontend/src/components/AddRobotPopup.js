import React, { useContext } from "react";
import AuthContext from '../context/auth-context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

function AddRobotPopup(props) {
    const contextType = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //get data from form
        const robotName = event.target.formName.value;
        const robotIP = event.target.formIPv4.value;
        //evaluate data
        if (robotName.trim().length === 0 || robotIP.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                mutation{
                    createRobot(robot_input:{name:"${robotName}", IPv4:"${robotIP}"}){
                        _id
                        name
                        IPv4
                        user{
                          _id
                        }
                    }
                }
            `
        };

        const token = contextType.token;
        let submitData;

        try {
            const res = await fetch("http://localhost:8000/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Faild!");
            } else {
                submitData = await res.json();
                props.addRobotToList(submitData.data.createRobot);
            }
        } catch (err) {
            throw err;
        }

        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Robot</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name of robot</Form.Label>
                        <Form.Control type="input" placeholder="CoolRobot" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formIPv4">
                        <Form.Label>IPv4</Form.Label>
                        <Form.Control type="input" placeholder="0.0.0.0" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save Robot
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddRobotPopup;