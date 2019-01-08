import React, { Component } from 'react'
import {
  Button,
  Input,
  FormGroup,
  Form,
  Label,
  Alert
} from 'reactstrap'

export default class CreateRestaurant extends Component {
  state = {
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '', // convert to number before creating
    errors: []
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      console.log('Please log in')
      // route to error page or log in page?
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description, address, city, state, zip, phone } = this.state;
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/restaurants', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.props.userId,
          name,
          description,
          address,
          city,
          state,
          zip,
          phone: Number(phone),
          disabled: false 
        })
      })

      res.json().then(() => this.props.history.push('/'));
    } catch (error) {
      console.log(error);
      this.setState({ errors: ['Something went wrong :('] })
    }
  }

  render() {
    let { name, description, address, city, state, zip, phone } = this.state
    return (
      <div className="container">
        {this.state.errors.length > 0 && <div>
          <Alert color="danger">
            <ul>
              {this.state.errors.map(error => (
                <li>{error}</li>
              ))}
            </ul>
          </Alert>
        </div>}
        <h2 style={{ textAlign: "center" }}>Create a restaurant!</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input 
              value={name}
              type="name"
              required
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              type="description"
              required
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address</Label>
            <Input
              value={address}
              type="address"
              required
              onChange={e => this.setState({ address: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              value={city}
              type="city"
              required
              onChange={e => this.setState({ city: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <Input
              value={state}
              type="state"
              required
              onChange={e => this.setState({ state: e.target.value })}
              maxLength={2}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="zip">Zipcode</Label>
            <Input
              value={zip}
              type="zip"
              required
              onChange={e => this.setState({ zip: e.target.value })}
              maxLength={10}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              value={phone}
              type="number"
              required
              onChange={e => this.setState({ phone: e.target.value })}
            />
          </FormGroup>
          <Button color="primary" size="lg" block>
            Create Restaurant!
          </Button>
        </Form>
      </div>
    )
  }
}