import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import NavBar from './components/shared/NavBar'
import SearchPage from './components/SearchPage'

export default class App extends Component {

  state = {
    loggedIn: false,
    owner: false
  }

  logout = async () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
  }

  setLoggedIn = () => {
    this.setState({ loggedIn: true })
  }

  checkOwner = async (email) => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    res.json().then(users => users.forEach(user => {
      if (user.email === email && user.owner) {
        this.setState({ owner: true })
      }
    }));
  }

  renderHome = (props) => {
    if (this.state.loggedIn) {
      return <Home owner={this.state.owner}/>
    } else {
      return <Login {...props} setLoggedIn={this.setLoggedIn} checkOwner={this.checkOwner} />
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />
          <Route
            path="/" exact
            render={(props) => this.renderHome(props)}
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
