import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

export default class NavBar extends Component {

  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link to="/">RrrrrrELP!</Link>
          <NavbarToggler onClick={this.toggleOpen} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.loggedIn ?
              <Nav className="ml-auto" navbar>
                <NavItem className="nav-item">
                  <Link to="/search">Search!</Link>
                </NavItem>
                <NavItem className="nav-item" onClick={this.props.logout}>
                  <Link to="/">Logout</Link>
                </NavItem>
              </Nav>
            : <Nav className="ml-auto" navbar>
                <NavItem className="nav-item">
                  <Link to="/signup">Signup</Link>
                </NavItem>
                <NavItem className="nav-item"> 
                  <Link to="/">Login</Link>
                </NavItem>
              </Nav>}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
