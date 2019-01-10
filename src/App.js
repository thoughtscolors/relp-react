import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import OwnerHomePage from './components/OwnerHomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import CreateRestaurant from './components/CreateRestaurant'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import NavBar from './components/shared/NavBar'
import SearchPage from './components/SearchPage'
import User from './components/User'
import MyProfile from './components/MyProfile'

export default class App extends Component {

  state = {
    loggedIn: false,
    user: {},
  }

  logout = async () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
  }

  signUpAndLogIn = async (user, password) => {
    try {
      const res = await fetch('http://localhost:3000/user_token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth: { email: user.email, password } })
      });

      const token = await res.json()
      console.log("RESPONSE JSON>>>", token);
      localStorage.setItem('token', token.jwt);

      this.logIn(user.email);
    } catch(error) {
      console.log(error);
      this.setState({ errors: ['Something went wrong :('] })
    }
  }

  logIn = async (email) => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    res.json().then(users => users.forEach(user => {
      if (user.email === email) {
        this.setState({ loggedIn: true, user })
      }
    }));
  }

  renderHome = (props) => {
    if (this.state.loggedIn) {
      if (this.state.user.owner) {
        return <OwnerHomePage user={this.state.user} {...props}/>
      } else {
        return <Restaurants user={this.state.user} {...props} />
      }
    } else {
      return <Login {...props} logIn={this.logIn} />
    }
  }

  render() {
    const { loggedIn, user } = this.state;
    return (
      <Router>
        <div>
          <NavBar loggedIn={loggedIn} logout={this.logout} owner={user.owner}/>
          <Route
            path="/" exact
            render={(props) => this.renderHome(props)}
          />
          <Route
            path="/signup" exact
            render={(props) => <Signup {...props} signUpAndLogIn={this.signUpAndLogIn}/>}
          />
          <Route path="/restaurants" exact render={(props) => <Restaurants {...props} user={user}/>} />
          <Route path="/restaurants/:id" render={(props) => <Restaurant {...props} user={user}/>} />
          <Route
            path="/addrestaurant" exact
            render={(props) => <CreateRestaurant {...props} loggedIn={loggedIn}/>}
          />
          <Route path="/search" render={(props) => <SearchPage {...props} user={user}/>} 
          />
          <Route path="/users/:id" render={(props) => <User {...props} user={this.state.user}/>} />
          <Route path="/profile" exact render={(props) => <MyProfile {...props} user={this.state.user}/>} />
        </div>
      </Router>
    )
  }
}
