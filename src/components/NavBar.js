import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

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
          <NavbarBrand href="/">RrrrrrELP!</NavbarBrand>
          <NavbarToggler onClick={this.toggleOpen} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.loggedIn ?
              <Nav className="ml-auto" navbar>
                <NavItem onClick={this.props.logout}>
                  {/* TODO: this logout function on click makes it incorrectly redirect to signup, but does clear localStorage*/}
                  <NavLink href='/'>Logout</NavLink>
                </NavItem>
              </Nav>
            : <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/signup">Signup</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Login</NavLink>
                </NavItem>
              </Nav>}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
