import React,{Component} from "react";
import AuthContext from '../context/auth-context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

class AuthPage extends Component{

    constructor(props){
        super(props);
        this.EMail = React.createRef();
        this.Password = React.createRef();
    }

    static contextType = AuthContext;

    submitHandle = (event) =>{
        event.preventDefault(); 

        const email = this.EMail.current.value;
        const password = this.Password.current.value;
        //neka slaba validacija samo da vidimo ako ima sta
        if(email.trim().length === 0 || password.trim().length ===0){
            return;
        }

        const requestBody = {
            query: `
                query{
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        fetch("http://localhost:8000/graphql",{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Faild!");
            }
            return res.json();
        })
        .then(resData =>{
            this.context.login(
                resData.data.login.token,
                resData.data.login.userId,
                resData.data.login.tokenExpiration);

        })
        .catch(err=>{
            throw err;
        });
    };

    render(){
        return( 
            <Container className="h-100">
                <Row className="h-100 justify-content-center align-items-center">
                    <Col className="col-10 col-md-8 col-lg-4">
                    <Form onSubmit={this.submitHandle}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="E-Mail"  ref={this.EMail}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={this.Password}  />
                        </Form.Group>
                        <Button variant="primary" type="submit">Log In</Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        );
        
    }
}

export default AuthPage;