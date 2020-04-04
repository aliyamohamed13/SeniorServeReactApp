import React, { Component } from "react";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import "../index.css";

import Mainlanding from "./mainlanding.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
var apiBaseUrl = "http://localhost:8080/api/v1/user/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      redirect: false,
      regUsername: "",
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      city: "",
      province: ""
    };
  }

  handleRegister(event) {
    console.log(this.state.regUsername);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
    console.log(this.state.address);
    console.log(this.state.postalCode);
    var self = this;
    axios
      .post("http://localhost:8080/api/v1/location/", {
        PostalCode: this.state.postalCode,
        Address: this.state.address,
        City: this.state.city,
        Province: this.state.province
      })
      .then(function(response) {
        if (
          response.status !== 200 ||
          self.state.regUsername === "" ||
          self.state.firstName === "" ||
          self.state.lastName === "" ||
          self.state.address === "" ||
          self.state.postalCode === ""
        ) {
        } else {
          axios
            .post(apiBaseUrl, {
              username: self.state.regUsername,
              firstName: self.state.firstName,
              lastName: self.state.lastName,
              postalCode: self.state.postalCode,
              address: self.state.address
            })
            .then(function(response1) {
              console.log(apiBaseUrl);
              console.log(response1);
              console.log(response1.data);
              if (response1.status === 200) {
                if (response1.data === "") {
                  console.log("Registration successful");
                  self.setState({ username: self.state.regUsername });
                  self.setState({ redirect: true });
                } else {
                  alert(
                    "This user may already exist, please try again or try logging in"
                  );
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
      });
  }

  handleRegisterLocation = () => {
    if (
      this.state.regUsername === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.address === "" ||
      this.state.postalCode === "" ||
      this.state.city === "" ||
      this.state.province === ""
    ) {
    } else {
      console.log("here are attributes");
      console.log(this.state.address);
      console.log(this.state.city);
      console.log(this.state.province);
      console.log(this.state.postalCode);
      axios
        .post("http://localhost:8080/api/v1/location/", {
          PostalCode: this.state.postalCode,
          Address: this.state.address,
          City: this.state.city,
          Province: this.state.province
        })
        .then(result => {
          console.log(result);
          this.handleRegisterUser();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  handleRegisterUser = () => {
    axios
      .post(apiBaseUrl, {
        username: this.state.regUsername,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        postalCode: this.state.postalCode,
        address: this.state.address
      })
      .then(response => {
        console.log(response);
        console.log(response.data);
        if (response.status === 200) {
          if (response.data === "") {
            console.log("Registration successful, redirecting");
            this.setState({ username: this.state.regUsername });
            this.setState({ redirect: true });
          } else {
            alert(
              "This user may already exist, please try again or try logging in"
            );
          }
        } else {
          console.log("something went wrong");
          alert("Something went wrong, please try again");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleClick(event) {
    console.log(this.state.username);

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
        <br />
        <h1 style={{ textAlign: "center" }}>Welcome to SeniorServe</h1>
        <h2>This application connects seniors and volunteers</h2>
        <br />
        <br />
        <Row>
          <Col>
            <Container>
              <h2>Already have an account?</h2>
              <br />
              <h3 style={{ marginBottom: "30px" }}>Login:</h3>
              <Form>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={event =>
                      this.setState({ username: event.target.value })
                    }
                  />
                </FormGroup>
                <Button
                  className="buttonOr"
                  onClick={event => this.handleClick(event)}
                >
                  Submit
                </Button>
              </Form>
            </Container>
          </Col>
          <Col>
            <h2>New to SeniorServe?</h2>
            <br />
            <h3 style={{ marginBottom: "30px" }}>Register:</h3>
            <Form>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="regUsername"
                  id="regUsername"
                  placeholder="Username"
                  onChange={event =>
                    this.setState({ regUsername: event.target.value })
                  }
                />
              </FormGroup>{" "}
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={event =>
                    this.setState({ firstName: event.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={event =>
                    this.setState({ lastName: event.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={event =>
                    this.setState({ address: event.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  onChange={event =>
                    this.setState({ city: event.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="province"
                  id="province"
                  placeholder="Province"
                  onChange={event =>
                    this.setState({ province: event.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="registerForm">
                <Input
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  placeholder="Postal Code"
                  onChange={event =>
                    this.setState({ postalCode: event.target.value })
                  }
                />
              </FormGroup>
              <Button
                className="buttonOr"
                onClick={this.handleRegisterLocation}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
