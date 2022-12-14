import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from 'react-router-dom';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import AuthContext from './context/auth-context';
import React from 'react';
import Navigation from './components/Navigation';
import ViewPage from './pages/View';
import RosContext from './context/ros-context';
import ROSLIB from 'roslib';


class App extends React.Component {

    state = {
      token:null,
      userId:null,
      ros: new ROSLIB.Ros(),
      isConnected: false,
      url: ' ',
      robotId:null
    };

  setConnection = (isConnected) =>{
    this.setState({isConnected:isConnected});
  }

  setUrl = (url) =>{
    this.setState({url:url});
  }

  setRobotId = (robotId) =>{
    this.setState({robotId:robotId});
  }
  
  login = (token, userId, tokenExpiration)=>{
    this.setState({token:token, userId:userId});
  };

  logout = () =>{
    this.setState({token:null, userId:null});
  };

  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <RosContext.Provider
          value={{
            ros:this.state.ros,
            isConnected: this.state.isConnected,
            url: this.state.url,
            robotId: this.state.robotId,
            setConnection: this.setConnection,
            setUrl: this.setUrl,
            setRobotId: this.setRobotId
          }}
          >
            <AuthContext.Provider 
              value={{
                token:this.state.token, 
                userId:this.state.userId,
                login: this.login, 
                logout: this.logout
                }}>
              <Navigation/>
              <Routes >
                {!this.state.token && <Route path="/auth" element={<AuthPage/>}/>}
                {this.state.token &&<Route path="/home" element={<HomePage/>}/> }
                
                {this.state.token && <Route path="/view" element={<ViewPage/>}/> } 
              
                {!this.state.token && <Route path="/" element={<Navigate to="/auth" replace/>}/>}
                {!this.state.token && <Route path="/home" element={<Navigate to="/auth" replace/>}/>}
                {!this.state.token && <Route path="/view" element={<Navigate to="/auth" replace/>}/>}
                
                {this.state.token && <Route path="/" element={<Navigate to="/home" replace/>}/>}
                {this.state.token && <Route path="/auth" element={<Navigate to="/home" replace/>}/>}
                
              </Routes>
            </AuthContext.Provider>
          </RosContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  };
}

export default App;
