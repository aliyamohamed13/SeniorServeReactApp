import React, { Component } from "react";
// import Users from "./components/users";
import Login1 from "./components/login1";

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
    return <Login1 />;
    // {
    /* <Users users={this.state.users} />; */
    // }
  }
}

export default App;
