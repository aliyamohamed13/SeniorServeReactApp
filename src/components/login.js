import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
      //   email: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:8080/api/v1/user/", {
      username: this.state.username
    });
    console.log("posted");
  }

  render() {
    return (
      <div className="Login">
        <form>
          <FormGroup controlId="username" bsSize="large">
            <FormControl
              autoFocus
              type="username"
              //value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </FormGroup>
          {/* <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                </FormGroup> */}
          <Button
            block
            bsSize="large"
            type="submit"
            onSubmit={e => this.handleSubmit(e)}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
