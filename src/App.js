import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Restaurants from './components/Restaurants'
import NavBar from './components/NavBar'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/restaurants" component={Restaurants} />
        </div>
      </Router>
    )
  }
}
