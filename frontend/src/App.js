import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from 'react-router-dom';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import AuthContext from './context/auth-context';
import React from 'react';
import Navigation from './components/Navigation';
import StatusPage from './pages/Status';

class App extends React.Component {

  state = {
    token:null,
    userId:null
  };
  
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
              //for testing auth is removed from /status path
              {<Route path="/status" element={<StatusPage/>}/> } //this.state.token &&
             
              {!this.state.token && <Route path="/" element={<Navigate to="/auth" replace/>}/>}
              {!this.state.token && <Route path="/home" element={<Navigate to="/auth" replace/>}/>}
              {!this.state.token && <Route path="/status" element={<Navigate to="/auth" replace/>}/>}
              
              {this.state.token && <Route path="/" element={<Navigate to="/home" replace/>}/>}
              {this.state.token && <Route path="/auth" element={<Navigate to="/home" replace/>}/>}
              
            </Routes>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  };
}

export default App;
