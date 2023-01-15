import React, { useContext, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import AuthContext from "../context/auth-context";
import RosContext from "../context/ros-context";

const Navigation = (props) => {
    const contextRos = useContext(RosContext);

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