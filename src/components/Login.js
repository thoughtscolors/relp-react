import React, { Component } from 'react'
import {
  Button,
  Input,
  FormGroup,
  Form,
  Label,
  Alert
} from 'reactstrap'

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: []
  }

  handleSubmit = async (e) => {
    try {
      const { email, password } = this.state
      e.preventDefault()

      const res = await fetch('http://localhost:3000/user_token', {
        method: 'POST',
        headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify( { auth: { email, password } })
      })

      if (res.status === 404) {
        this.setState({ errors: ['Wrong email or password'] })
      } else {
        const json = await res.json()
        console.log("RESPONSE JSON>>>", json);
        localStorage.setItem('token', json.jwt);

        this.props.logIn(email).then(() => this.props.history.push('/'));
      }

    } catch (error) {
      console.log(error);
      this.setState({ errors: ['Something went wrong :('] })
    }
  }

  render() {
    let { email, password } = this.state

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
        <div className="w100 text-center">
          <img src='https://i.pinimg.com/originals/b2/76/af/b276af58ff041b951321765eec87ce29.png' style={{height: "120px"}} alt="pizza-spinning"/>
        </div>
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
