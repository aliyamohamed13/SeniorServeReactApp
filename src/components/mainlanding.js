import React, { Component } from "react";
import Nav from "./nav.js";
import Tasksboard from "./tasksboard.js";
import Welcome from "./welcome.js";
import Reviews from "./reviews.js";
import Records from "./records.js";
import EditUserProfile from "./userProfile.js";
import GeneralTasksBoard from "./generaltasksboard";
import GeneralTasksBoardVolunteer from "./generaltasksboardvolunteer";
import VolunteerLeaderBoard from "./volunteerleaderboard";
import TasksBoardVolutneer from "./tasksboardvolunteer";
import TaskRequest from "./taskrequest";
import NavSenior from "./navSenior.js";
import UserJoin from "./userjoin"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Mainlanding extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      senior: ""
    };
  }

  componentDidMount() {
    this.setState({ username: this.props.location.state.username });
    fetch(
      "https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/senior/" +
      this.props.location.state.username
    )
      .then(res => res.json())
      .then(data => {
        console.log("data is: " + data);
        this.setState({ senior: data });
      })
      .catch(console.log);
  }

  render() {
    console.log(this.state.username);
    return (
      <Router>
        <div>
          {this.state.senior ? (
            <NavSenior username={this.state.username} />
          ) : (
              <Nav username={this.state.username} />
            )}
          <Switch>
            <Route
              path="/mainlanding"
              render={() => <Welcome username={this.state.username} />}
            />
            <Route
              path="/taskboard"
              render={() => <Tasksboard username={this.state.username} />}
            />
            <Route
              path="/taskrequest"
              render={() => <TaskRequest username={this.state.username} />}
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
            <Route
              path="/volunteerTasksBoard"
              render={() => (
                <GeneralTasksBoardVolunteer username={this.state.username} />
              )}
            />
            <Route
              path="/volunteerLeaderBoard"
              render={() => (
                <VolunteerLeaderBoard username={this.state.username} />
              )}
            />
            <Route
              path="/tasksboardVolunteer"
              render={() => (
                <TasksBoardVolutneer username={this.state.username} />
              )}
            />
            <Route
              path="/compareUsers"
              render={() => (
                <UserJoin username={this.state.username} />
              )}
            />
            <Route
              path="/userProfile"
              render={() => <EditUserProfile username={this.state.username} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Mainlanding;
