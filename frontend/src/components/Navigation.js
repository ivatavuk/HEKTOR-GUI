import React, { useContext, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import AuthContext from "../context/auth-context";
import RosContext from "../context/ros-context";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import AddVideoFeedPopup from "./AddVideoFeedPopup";
//topic contet

const Navigation = (props) => {
    const contextRos = useContext(RosContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleVideoFeeePopup = (event) =>{
        event.preventDefault();
        setShow(true)
    }   

    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                    <Navbar className='fixed-top' variant="dark" bg="dark" display="block" expand="lg">
                        <Container fluid>
                            {context.token && <Navbar.Toggle className='ma-auto' />}
                            <Navbar.Brand>HEKTOR</Navbar.Brand>
                            {context.token &&
                                <React.Fragment>
                                    <NavbarCollapse>
                                        <Nav className='ms-auto'>
                                            <LinkContainer to='/home'>
                                                <Nav.Link className='px-5'>Home</Nav.Link>
                                            </LinkContainer>
                                            {/* Show only if we have a ROS connection */}
                                            {contextRos.isConnected &&
                                                <LinkContainer to='/view'>
                                                    <Nav.Link className='px-5'>View</Nav.Link>
                                                </LinkContainer>}
                                            {contextRos.isConnected &&
                                                <Dropdown as={NavItem} className='px-5'>
                                                    <Dropdown.Toggle as={NavLink} variant="primary" id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item id="t1" onClick={handleVideoFeeePopup}>Add video feed</Dropdown.Item>
                                                        <Dropdown.Item id="t1">Add point cloud</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                            <AddVideoFeedPopup show={show} handleClose={handleClose} />
                                        </Nav>
                                    </NavbarCollapse>
                                    <Button variant="primary" onClick={context.logout}>Log Out</Button>
                                </React.Fragment>
                            }
                        </Container>
                    </Navbar>

                );
            }}
        </AuthContext.Consumer>
    );
}

export default Navigation;