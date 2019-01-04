import React, { Component } from 'react'
import {
  Button,
  Input,
  FormGroup,
  Form,
  Label
} from 'reactstrap'

export default class Signup extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    owner: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirm_password, owner } = this.state

    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify( { name, email, password, confirm_password, owner } )
    })

    console.log(await res.json());
  }

  render() {

    let { name, email, password, confirm_password } = this.state

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              value={name}
              required
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              type="email"
              className="form-control"
              required
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              type="password"
              className="form-control"
              minLength={8}
              required
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              value={confirm_password}
              type="password"
              className="form-control"
              minLength={8}
              required
              onChange={(event) => this.setState({ confirm_password: event.target.value })}
            />
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={async () => {
                await this.setState({ owner: !this.state.owner })
                console.log("Owner", this.state.owner);
              }} />{' '}
              Sign up as resturant owner
            </Label>
          </FormGroup>

          <Button color="primary" size="lg" block>
            Signup
          </Button>
        </Form>
      </div>
    )
  }
}
