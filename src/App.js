import React, { Component } from "react";
// import Users from "./components/users";
import Login from "./components/login";

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
    return <Login />;
    // {
    /* <Users users={this.state.users} />; */
    // }
  }
}

export default App;
