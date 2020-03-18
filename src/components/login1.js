import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import TaskBoard from "./tasksboard.js";
import axios from "axios";

class Login1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
      // password: ""
    };
  }
  handleClick(event) {
    var apiBaseUrl = "http://localhost:8080/api/v1/user/";
    var self = this;
    console.log(this.state.username);
    var payload = this.state.username;
    //   password: this.state.password

    console.log(payload);

    //TODO this get doesnt send with payload, response seems to be just from baseurl
    axios
      .get(apiBaseUrl, payload)
      .then(function(response) {
        console.log(apiBaseUrl);
        console.log(payload);
        console.log(response);
        console.log(response.data.contains(payload));
        if ((response.status == 200) & response.data.contains(payload)) {
          console.log("Login successful");

          //   var taskBoard = [];
          //   taskBoard.push(<TaskBoard appContext={self.props.appContext} />);
          //   self.props.appContext.setState({
          //     loginPage: [],
          //     taskBoard: taskBoard
          //   });
        } else if (response.status == 500) {
          console.log("username does not exist");
          alert("Username does not exist, please register");
        } else {
          console.log("something went wrong");
          alert("Something went wrong, please try again");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
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
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login1;
