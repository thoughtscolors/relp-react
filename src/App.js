import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import OwnerHomePage from './components/OwnerHomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import CreateRestaurant from './components/CreateRestaurant'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import NavBar from './components/shared/NavBar'
import SearchPage from './components/SearchPage'

export default class App extends Component {

  state = {
    loggedIn: false,
    owner: false,
    user: {},
  }

  logout = async () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
  }

  setLoggedIn = () => {
    this.setState({ loggedIn: true })
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

      const isOwner = await this.checkOwner(user.email);
      if (!isOwner) {
        this.setLoggedIn();
      }
    } catch(error) {
      console.log(error);
      this.setState({ errors: ['Something went wrong :('] })
    }
  }

  checkOwner = async (email) => {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    let owner = false;

    res.json().then(users => users.forEach(user => {
      if (user.email === email && user.owner) {
        this.setState({ owner: true, user }, () => {
          this.setLoggedIn();
          owner = true;
        })
      }
    }));
    return owner;
  }

  renderHome = (props) => {
    if (this.state.loggedIn) {
      if (this.state.owner) {
        return <OwnerHomePage user={this.state.user} {...props}/>
      } else {
        return <SearchPage />
      }
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
            render={(props) => <Signup {...props} signUpAndLogIn={this.signUpAndLogIn}/>}
          />
          <Route path="/restaurants" exact component={Restaurants} />
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/addrestaurant" component={CreateRestaurant} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}
