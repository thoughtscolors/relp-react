import React, { Component } from 'react'
import {
  Button,
  Input,
  FormGroup,
  Label
} from 'reactstrap'

export default class Login extends Component {

  state = {
    email: undefined,
    password: undefined
  }

  handleSubmit = async () => {
    const { email, password } = this.state

    const res = await fetch('http://localhost:3000/user_token', {
      method: 'POST',
      headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify( { auth: { email, password } })
    })

    console.log(await res.json());
  }

  render() {

    let { email, password } = this.state

    return (
      <div className="container">
        <div className="form">
          <FormGroup>
            <Label for="email">Email</Label>
            <Input  value={email}
                    onChange={(event) => this.setState({ email: event.target.value })}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input value={password}
                   onChange={(event) => this.setState({ password: event.target.value })}/>
          </FormGroup>

          <Button color="primary" size="lg" block onClick={this.handleSubmit}>Login</Button>
          <Button color="secondary" size="lg" block href={'/signup'}>Signup</Button>
        </div>
      </div>
    )
  }
}
