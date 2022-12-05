import React,{ useState, useContext, useEffect} from "react";
import './Main.css';
import AuthContext from '../context/auth-context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import AddRobot from "../components/AddRobotPopup";
import RobotCard from "../components/RobotCard";
import Row from 'react-bootstrap/Row';


function HomePage(){
    const [robotList, setRobotList] = useState([]);

    useEffect(()=>{
        fetchRobots();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addRobotToList = (robot) =>{
        setRobotList([
            ...robotList,
            robot
        ]);
    }

    const removeRobotFromList = (robotId) =>{
        let filteredArray = robotList.filter(function(robot) { return robot._id !== robotId });
        setRobotList(filteredArray);
    }

    const contextType = useContext(AuthContext);

    const fetchRobots = async () => {
        const requestBody = {
            query: `
                query{
                    robots{
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

        const token = contextType.token ;

        try{
            const res = await fetch("http://localhost:8000/graphql",{
                method: "POST",
                body: JSON.stringify(requestBody),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if(res.status !== 200 && res.status !== 201){
                throw new Error("Faild!");
            }else{
                let data = await res.json();
                if(data){
                    setRobotList(data.data.robots);
                }
            }
        }catch(err){
            throw err;
        }   
    }

    return (
        <Container className="page-position h-100">
            <Button variant="primary" onClick={handleShow} style={{"margin-bottom":"5px"}}>Add Robot</Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {robotList.map(function(robot){
                    return (<RobotCard robot={robot} removeRobotFromList= {removeRobotFromList} />)
                })}
            </Row>
            <AddRobot handleClose = {handleClose} show={show} addRobotToList={addRobotToList} />
        </Container>

    );
}

export default HomePage;