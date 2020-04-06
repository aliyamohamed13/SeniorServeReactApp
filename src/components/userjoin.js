import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import JoinRender from "./joinrender";

class UserJoin extends Component {
  constructor() {
    super();
    this.state = {
      attributesToJoinBy: [
        "first_name",
        "last_name",
        "postalcode",
        "address",
        "city",
        "province",
        "rating",
        "totalhours",
      ],
      attributeJoinCondition: [">", "<", "=", "<>"],

      selectedJoinBy: "",
      selectedJoinCondition: "",

      joinOutcome: [],

      defaultValue: "Please Select",
    };
  }

  handleJoinQuery = (event) => {
    event.preventDefault();
    axios
      .get(
        "http://localhost:8080/api/v1/user/userJoin/" +
          this.state.selectedJoinBy +
          "&" +
          this.state.selectedJoinCondition
      )
      .then((result) => {
        console.log(result);
        console.log(result.data);
        this.setState({ joinOutcome: result.data });
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });
  };

  reset = () => {
    this.setState({
      selectedJoinBy: "",
      selectedJoinCondition: "",
      joinOutcome: [],
    });

    document
      .querySelectorAll("select")
      .forEach((ele) => (ele.selectedIndex = 0));
  };

  render() {
    let joinRender;

    if (this.state.joinOutcome.length === 0) {
      joinRender = <h3> -- Nothing has been chosen yet -- </h3>;
    } else {
      joinRender = (
        <JoinRender
          joinResult={this.state.joinOutcome}
          joinSymbol={this.state.selectedJoinCondition}
          joinAttribute={this.state.selectedJoinBy}
        />
      );
    }

    return (
      <div>
        <center>
          <br />
          <h1> Compare Attributes Between Users </h1>
        </center>
        <div>
          <form onSubmit={(event) => this.handleJoinQuery(event)}>
            <div>
              <label> Attribute: </label>
              {"   "}
              <select
                defaultValue={this.state.defaultValue}
                onChange={(e) =>
                  this.setState({ selectedJoinBy: e.target.value })
                }
                key={"attributesToJoinBy"}
              >
                <option key="default" disabled>
                  Please Select
                </option>
                {this.state.attributesToJoinBy.map((key) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
              {"   "}
            </div>
            <div>
              <label> Condition: </label>
              {"   "}
              <select
                defaultValue={this.state.defaultValue}
                onChange={(e) =>
                  this.setState({ selectedJoinCondition: e.target.value })
                }
                key={"attributeJoinCondition"}
              >
                <option key="default" disabled>
                  Please Select
                </option>
                {this.state.attributeJoinCondition.map((key) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
              {"   "}
            </div>
            <Button type="submit"> Compare! </Button>
            {"   "}
          </form>
        </div>
        {"   "}
        <div style={{ marginTop: 5 }}>
          <Button type="button" onClick={this.reset}>
            {" "}
            Reset{" "}
          </Button>
        </div>
        {joinRender}
      </div>
    );
  }
}

export default UserJoin;
