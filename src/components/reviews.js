import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import axios from "axios";

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviewInfo: [],
      volunteers: [],
      seniors: [],
      volunteerUserName: "",
      seniorUsername: "",
      averageRating: "",

      defaultValue: "Please Select",
    };
  }

  componentDidMount() {
    console.log(this.props.username);
    fetch("http://localhost:8080/api/v1/review/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ reviewInfo: data });
      })
      .catch(console.log);
    fetch("http://localhost:8080/api/v1/review/distinctUsersWithReviews")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ volunteers: data });
      })
      .catch(console.log);
    fetch("http://localhost:8080/api/v1/user/seniorUsername")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ seniors: data });
      })
      .catch(console.log);
  }

  handleSubmitVolunteer = (event) => {
    console.log(this.state.volunteerUserName);
    event.preventDefault();

    axios
      .get(
        "http://localhost:8080/api/v1/review/volunteer=" +
          this.state.volunteerUserName
      )
      .then((result) => {
        console.log(result);
        console.log(result.data);
        this.setState({ reviewInfo: result.data });
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });

    axios
      .get(
        "http://localhost:8080/api/v1/review/averageRating/volunteer=" +
          this.state.volunteerUserName
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.setState({ averageRating: response.data });
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });

    var showStat = document.getElementById("filterStats");
    showStat.style.display = "block";
  };

  handleSubmitSenior = (event) => {
    console.log(this.state.taskID);
    event.preventDefault();

    axios
      .get(
        "http://localhost:8080/api/v1/review/senior=" +
          this.state.seniorUsername
      )
      .then((result) => {
        console.log(result);
        console.log(result.data);
        this.setState({ reviewInfo: result.data });
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });

    axios
      .get(
        "http://localhost:8080/api/v1/review/averageRating/senior=" +
          this.state.seniorUsername
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.setState({ averageRating: response.data });
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });

    var showStat = document.getElementById("filterStats");
    showStat.style.display = "block";
  };

  handleReset = () => {
    this.setState({ reviewInfo: [] });
    fetch("http://localhost:8080/api/v1/review/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ reviewInfo: data });
      });
    var showStat = document.getElementById("filterStats");
    showStat.style.display = "none";

    document
      .querySelectorAll("select")
      .forEach((ele) => (ele.selectedIndex = 0));
  };

  render() {
    return (
      <div>
        <center>
          <br />
          <h1>Review</h1>
        </center>
        <form onSubmit={(event) => this.handleSubmitVolunteer(event)}>
          <div>
            <label> Volunteer Username: </label>
            {"   "}
            <select
              defaultValue={this.state.defaultValue}
              onChange={(e) =>
                this.setState({ volunteerUserName: e.target.value })
              }
              key={"volunteerUserName"}
            >
              <option key="default" disabled>
                Please Select
              </option>
              {this.state.volunteers.map((key) => (
                <option key={key}>{key}</option>
              ))}
            </select>
            {"   "}
            <Button className="request-btn" type="submit">
              {" "}
              Filter By Volunteer{" "}
            </Button>
          </div>
        </form>
        <br />
        <form onSubmit={(event) => this.handleSubmitSenior(event)}>
          <div>
            <label> Senior Username: </label>
            {"   "}
            <select
              defaultValue={this.state.defaultValue}
              onChange={(e) =>
                this.setState({ seniorUsername: e.target.value })
              }
              key={"seniorUserName"}
            >
              <option key="default" disabled>
                Please Select
              </option>
              {this.state.seniors.map((key) => (
                <option key={key}>{key}</option>
              ))}
            </select>
            {"   "}
            <Button className="request-btn" type="submit">
              {" "}
              Filter By Senior{" "}
            </Button>
          </div>
        </form>
        <Button
          style={{ marginBottom: 10 }}
          type="button"
          onClick={this.handleReset}
        >
          {" "}
          Reset{" "}
        </Button>
        <div id="filterStats" style={{ display: "none", marginBottom: 10 }}>
          <h6>Average Rating: {this.state.averageRating}</h6>
        </div>
        <Container className="tasks-grid">
          {this.state.reviewInfo.map((review) => (
            <div
              key={review.taskID + review.volunteerUserName}
              className="card"
            >
              <div className="card-body">
                <h5 className="card-title">{review.description}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Rating: {review.rating}
                </h6>
                <p className="card-text">
                  {" "}
                  Volunteer: {review.volunteerUserName}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}

export default Reviews;
