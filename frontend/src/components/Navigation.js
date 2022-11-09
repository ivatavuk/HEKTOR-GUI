import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import { Button, Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const Navigation = (props) =>{

    return (
    <Navbar className='fixed-top' variant="dark" bg="dark" display="block" expand="lg">
        <Navbar.Brand>HEKTOR</Navbar.Brand>
        <Container fluid>
        <Navbar.Toggle className='ma-auto'/>
        <NavbarCollapse>
            {props.authState.token &&
        <Nav className='ms-auto'>
            <LinkContainer to='/home'>
                <Nav.Link className='px-5'>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/status'>
                <Nav.Link className='px-5'>Status</Nav.Link>
            </LinkContainer>
        </Nav>
        }
        </NavbarCollapse>
        <Button variant="primary">Log Out</Button>
        </Container>
    </Navbar>
    );
}

export default Navigation;