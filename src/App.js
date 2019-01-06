import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Restaurants from './components/Restaurants'
import NavBar from './components/NavBar'

export default class App extends Component {

  state = {
    loggedIn: false
  }

  logout = async () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
  }

  setLoggedIn = () => {
    this.setState({ loggedIn: true })
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout}/>
          <Route
            path="/" exact
            render={(props) => <Login {...props} setLoggedIn={this.setLoggedIn}/>}
          />
          <Route
            path="/signup" exact
            render={(props) => <Signup {...props} setLoggedIn={this.setLoggedIn}/>}
          />
          <Route path="/restaurants" exact component={Restaurants} />
        </div>
      </Router>
    )
  }
}
