import React, { Component } from "react";
import { Container } from "reactstrap";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      senior: ""
    };
  }

  componentDidMount() {
    this.setState({ username: this.props.username });
    fetch("http://localhost:8080/api/v1/user/senior/" + this.props.username)
      .then(res => res.json())
      .then(data => {
        console.log("data is: " + data);
        this.setState({ senior: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <br />
        <h1> Welcome to SeniorServe </h1>
        <Container>
          {this.state.senior ? (
            <h3>
              As a senior using SeniorServe you can create tasks which
              volunteers will request to help you with.
              <br />
              <br />
              See all your tasks in the 'My Tasks' tab, approve requests from
              volunteers to help you with your task in the "Task Requests" tab,
              and write reviews for users in "Reviews tab". You can view all
              available tasks and create new ones in the "All Tasks" tab as well
              as access a volunteer leaderboard through the "Leaderboard" tab.
            </h3>
          ) : (
            <h3>
              As a volunteer using SeniorServe you can sign up to volunteer for
              tasks that seniors around you have created. Once a senior approves
              your request to help them, we keep track of your volutneer hours
              for you.
              <br />
              <br />
              See all available tasks in the 'My Tasks' and make a request on
              one you would like to help with. To see your requested and
              upcoming tasks go to "Taskboard" and to see all your completed
              hours go to "Volunteer Record" tab. You can also go to
              "Leaderboard" to see a volunteer leaderboard as well as reviews
              for other users of SeniorServe in "Reviews" tab.
            </h3>
          )}
        </Container>
      </div>
    );
  }
}

export default Welcome;
