import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import NavBar from './components/shared/NavBar'
import SearchPage from './components/SearchPage'

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
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}
