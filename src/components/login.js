import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { Container, Button, Form, FormGroup, Input } from "reactstrap";
// import "../../index.css";
import "../index.css";

import Mainlanding from "./mainlanding.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      redirect: false
    };
  }

  handleClick(event) {
    //event.preventdefault();
    console.log(this.state.username)
    var apiBaseUrl = "http://localhost:8080/api/v1/user/";
    var self = this;
    console.log("username: ${this.state.username}");
    console.log(this.state.username);
    if (this.state.username === "") {
    } else {
      axios
        .get(apiBaseUrl + this.state.username)
        .then(function(response) {
          console.log(apiBaseUrl);
          console.log(response);
          if (response.status === 200) {
            if (response.data !== "") {
              console.log("Login successful");
              self.setState({ redirect: true });
            } else {
              alert("Username does not exist, please register");
            }
          } else {
            console.log("something went wrong");
            alert("Something went wrong, please try again");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  render() {
    if (this.state.redirect) {
      React.createContext(this.state.username);
      console.log("redirecting...");
      return (
        <Router>
          <Switch>
            <Route path="/mainlanding" component={Mainlanding} />
            <Redirect
              to={{
                pathname: "/mainlanding",
                state: { username: this.state.username }
              }}
            ></Redirect>
          </Switch>
        </Router>
      );
    }
    return (
      <div className="LoginRegForm">
        <Container>
          <h1 style={{ marginBottom: "30px" }}>Login</h1>
          <Form>
            {/* onSubmit={event => this.handleClick(event)} */}
            <FormGroup style={{ marginBottom: "30px" }}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </FormGroup>
            {/* <FormGroup style={{"marginBottom":"30px"}}>
          <Input type="password" name="password" id="password" placeholder="password" />
        </FormGroup> */}
            <Button
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
                color: "black"
              }}
              className="buttonOr"
              onClick={event => this.handleClick(event)}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
      /* <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br /> 
       <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            /> 
       <br />
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider> 
      </div> */
    );
  }
}

export default Login;
