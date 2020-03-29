import React, { Component } from "react";
import Nav from "./nav.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
var apiBaseUrl = "http://localhost:8080/api/v1/user/";

// const EditUserProfile = props => {
//   console.log("about", JSON.stringify(props));
//   console.log(props.username);
//   return (
//   <div></div>
//   );
// };
class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      firstName: "",
      lastName: "",
      address: "",
      postalCode: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/user/" + this.props.username)
      .then(res => res.json())
      .then(data => {
        this.setState({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          postalCode: data.postalCode
        });
        console.log(this.state.address);
        console.log(this.state.postalCode);
      })
      .catch(console.log);
  }

  onSaveClick(event) {
    //  axios.delete(apiBaseUrl, user)
    // .then((user) => {
    //     console.log("user deleted: ", user)
    // })
    axios
      .put(apiBaseUrl + this.state.username, {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        postalCode: this.state.postalCode
      })
      .then(function(response) {
        if (response.status === 200) {
          console.log("updated successfully");
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDeleteClick(event) {
    var self = this;
    console.log(85);
    console.log(this.props.username);
    axios
      .delete(apiBaseUrl + this.props.username, {})
      .then(function(response) {
        if (response.status === 200) {
          self.setState({ redirect: true });
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //   state = {
  //     user: ""
  //   };

  //   componentDidMount() {
  //     const { handle } = this.props.username;
  //   }

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
        <h1> Edit User Profile </h1>
        <h3>
          To edit your user profile for {this.props.username} change the fields
          below and click save
        </h3>
        <Container>
          <Row className="profile-row">
            <h4>Username:</h4>
            <input
              type="text"
              defaultValue={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </Row>
          <Row className="profile-row">
            <div className="profile-row-inner">
              <h4>First Name: </h4>
              <input
                type="text"
                defaultValue={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
              />
            </div>
          </Row>
          <Row className="profile-row">
            <h4>Last Name: </h4>
            <input
              type="text"
              defaultValue={this.state.lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </Row>
          <Row className="profile-row">
            <h4>Address: </h4>
            <input
              type="text"
              defaultValue={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
            />
          </Row>
          <Row className="profile-row">
            <h4>Postal Code: </h4>
            <input
              type="text"
              defaultValue={this.state.postalCode}
              onChange={e => this.setState({ postalCode: e.target.value })}
            />
          </Row>

          <Button color="warning" onClick={event => this.onSaveClick(event)}>
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
