import React, { Component } from "react";
import Nav from "./nav.js";
import Tasksboard from "./tasksboard.js";
import Welcome from "./welcome.js";
import Reviews from "./reviews.js";
import Records from "./records.js";
import NavSenior from "./navSenior.js";
import GeneralTasksBoard from "./generaltasksboard";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Mainlanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      senior: ""
    };
  }

  componentDidMount() {
    this.setState({ username: this.props.location.state.username });
    fetch(
      "http://localhost:8080/api/v1/user/senior/" +
        this.props.location.state.username
    )
      .then(res => res.json())
      .then(data => {
        console.log("data is: " + data);
        this.setState({ senior: data });
      })
      .catch(console.log);
  }

  //   checkBool(response, user) {
  //     for (const i of response) {
  //       if (i.username == user) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   }
  //   isSenior(user) {
  //     axios
  //       .get("http://localhost:8080/api/v1/user/senior/")
  //       .then(function(response) {
  //         let returner = false;
  //         console.log(response.data);
  //         console.log("data is " + response.data);
  //         for (const i of response.data) {
  //           console.log("looping");
  //           console.log(i.username);
  //           console.log(user);
  //           if (i.username == user) {
  //             console.log("user is a senior");
  //             returner = true;
  //           }
  //         }
  //         console.log(returner);
  //         return returner;
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //   }

  render() {
    // console.log(this.state.username);
    // console.log(this.state.senior);
    return (
      <Router>
        <div>
          {this.state.senior ? (
            <NavSenior username={this.state.username} />
          ) : (
            <Nav username={this.state.username} />
          )}
          <Switch>
            <Route path="/mainlanding" component={Welcome} />
            <Route
              path="/taskboard"
              render={() => <Tasksboard username={this.state.username} />}
            />
            <Route
              path="/records"
              render={() => <Records username={this.state.username} />}
            />
            <Route
              path="/reviews"
              render={() => <Reviews username={this.state.username} />}
            />
            <Route
              path="/generalTasksBoard"
              render={() => (
                <GeneralTasksBoard username={this.state.username} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Mainlanding;
