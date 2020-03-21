import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Mainlanding from "./mainlanding.js";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      // password: ""
      redirect: false
    }
  }

  handleClick = (event) => {
    var apiBaseUrl = "http://localhost:8080/api/v1/user/";
    var self = this;
    console.log(this.state.username);
    if(this.state.username === "") {
      // do nothing
    } else {
    // var payload = this.state.username;
    //   password: this.state.password


    //TODO this get doesnt send with payload, response seems to be just from baseurl
    //work around to this would be
      axios
        .get(apiBaseUrl + this.state.username)
        .then(function(response) {
          console.log(apiBaseUrl);
          console.log(response);
          if (response.status === 200) {
              if(response.data !== "") {
              console.log("Login successful");
              self.setState({redirect: true})
              } else {
            //TODO route to dashboard with user tasks sent as props

            //   var taskBoard = [];
            //   taskBoard.push(<TaskBoard appContext={self.props.appContext} />);
            //   self.props.appContext.setState({
            //     loginPage: [],
            //     taskBoard: taskBoard
            //   });
            alert("Username does not exist, please register");
            }
          } else {
            console.log("something went wrong");
            alert("Something went wrong, please try again");
          }})
        .catch(function(error) {
          console.log(error);
        })
      }
  }

    // axios({
    //   method: "get",
    //   url: "http://localhost:8080/api/v1/user/",
    //   params: {
    //   this.state.username,
    //   })
    //   .then()

  render() {
    if (this.state.redirect) {
      console.log("redirecting...")
      return (
        <Router>
          <Switch>
            <Route path="/mainlanding" component={Mainlanding} />
            <Redirect to={{
              pathname: "/mainlanding",
              state: {username: this.state.username}
              }}></Redirect>
          </Switch>
        </Router>
      )
    } 
    return (
      <div>
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
            {/* <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            /> */}
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Login;
