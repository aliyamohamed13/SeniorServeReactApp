import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import {
  Container,
  Button
} from "reactstrap";
var apiBaseUrl = "https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/";

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      city: "",
      province: ""
    };
  }

  componentDidMount() {
    fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/" + this.props.username)
      .then(res => res.json())
      .then(data => {
        this.setState({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          postalCode: data.postalCode,
          city: data.city,
          province: data.province
        });
        console.log(this.state.address);
        console.log(this.state.postalCode);
      })
      .catch(console.log);
  }

  updateUserLocation = () => {
    if (
      this.state.username === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.address === "" ||
      this.state.postalCode === ""
    ) {
    } else {
      console.log(this.state.username);
      console.log(this.state.firstName);
      console.log(this.state.lastName);
      console.log(this.state.address);
      console.log(this.state.postalCode);
      axios
        .post("https://seniorserve-spring-postgres.herokuapp.com/api/v1/location/", {
          PostalCode: this.state.postalCode,
          Address: this.state.address,
          City: this.state.city,
          Province: this.state.province
        })
        .then(result => {
          console.log(result);
          this.updateUser();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  updateUser = () => {
    axios
      .put(apiBaseUrl + this.state.username, {
        username: this.state.username,
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
            console.log("Update successful");
          } else {
            alert("Please try again");
          }
        } else {
          console.log("something went wrong");
          alert("Something went wrong, please try again");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteClick(event) {
    var self = this;
    console.log(85);
    console.log(this.props.username);
    axios
      .delete(apiBaseUrl + this.props.username, {})
      .then(function (response) {
        if (response.status === 200) {
          self.setState({ redirect: true });
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect) {
      React.createContext(this.state.username);
      console.log("redirecting...");
      return (
        <Router>
          <Switch>
            <Redirect
              to={{
                pathname: "/"
              }}
            ></Redirect>
          </Switch>
        </Router>
      );
    }
    return (
      <div>
        <Container>
          <br />
          <h1> Edit User Profile </h1>
          <h3>
            To edit your user profile for <strong>{this.props.username}</strong>{" "}
            change the fields below and click save
          </h3>
        </Container>
        <Container>
          <div className="field">
            <label>First Name: </label>
            <input
              type="text"
              defaultValue={this.state.firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Last Name: </label>
            <input
              type="text"
              defaultValue={this.state.lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Address: </label>
            <input
              type="text"
              defaultValue={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
            />
          </div>
          <div className="field">
            <label>City: </label>
            <input
              type="text"
              defaultValue={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Province: </label>
            <input
              type="text"
              defaultValue={this.state.province}
              onChange={e => this.setState({ province: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Postal Code: </label>
            <input
              type="text"
              defaultValue={this.state.postalCode}
              onChange={e => this.setState({ postalCode: e.target.value })}
            />
          </div>

          <Button
            color="warning"
            onClick={this.updateUserLocation}
            style={{ marginRight: "10px" }}
          >
            Save Changes
          </Button>
          <Button color="danger" onClick={event => this.onDeleteClick(event)}>
            Delete account
          </Button>
        </Container>
      </div>
    );
  }
}

export default EditUserProfile;
