import React, { Component } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ToDo from './Components/ToDo'
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'

import Traffic from './Components/Traffic'





const App = () => {


return(

  <Router>
    <div>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/" component={Traffic} />
      <Route exact path="/todo" component={ToDo} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  </Router>

)
}



export default App;
