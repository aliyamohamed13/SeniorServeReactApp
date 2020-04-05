import React, { Component } from "react";
// import Users from "./components/users";
import Login from "./components/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VolunteerLeaderBoard from "./components/volunteerleaderboard";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/user/")
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div id="AppSS">
        <Router>
          <Switch>
            <Route path="/" exact component={VolunteerLeaderBoard} />
          </Switch>
        </Router>
      </div>
    );
    // {
    /* <Users users={this.state.users} />; */
    // }
  }
}

export default App;
