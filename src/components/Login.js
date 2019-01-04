import React, { Component } from 'react'
import {
  Button,
  Input,
  FormGroup,
  Form,
  Label
} from 'reactstrap'

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    const { email, password } = this.state
    e.preventDefault()

    const res = await fetch('http://localhost:3000/user_token', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify( { auth: { email, password } })
    })

    const json = await res.json()
    console.log("RESPONSE JSON>>>", json);
    localStorage.setItem('token', json.jwt)

  }

  render() {

    let { email, password } = this.state

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
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

          <Button color="primary" size="lg" block>
            Login
          </Button>
          <Button color="secondary" size="lg" block href={'/signup'}>
            Signup
          </Button>
        </Form>
      </div>
    )
  }
}
