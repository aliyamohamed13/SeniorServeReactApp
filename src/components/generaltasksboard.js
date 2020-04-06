import React, { Component } from "react";
import Tasks from "./tasks";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Form, FormGroup, Input, Button } from "reactstrap";

class GeneralTasksBoard extends Component {
  constructor() {
    super();
    this.state = {
      TaskInfo: [],

      Cities: [],
      Provinces: [],
      Preferences: [],

      SelectedCities: [],
      SelectedProvinces: [],
      SelectedPreferences: [],

      AllPreferencesForAddTask: [],

      show: false,
      // Add task form state
      Date: "",
      Description: "",
      Num_Volunteer: "",
      PostalCode: "",
      Address: "",
      City: "",
      Province: "",
      AddTaskPreferencesID: [],
    };
  }

  componentDidMount() {
    console.log(this.props.username);
    fetch("http://localhost:8080/api/v1/task/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ TaskInfo: data });
      })
      .catch(console.log);
    fetch("http://localhost:8080/api/v1/preference/getAllPreferenceNames")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ Preferences: data });
      });
    fetch("http://localhost:8080/api/v1/location/getAllCities")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ Cities: data });
      });
    fetch("http://localhost:8080/api/v1/location/getAllProvinces")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ Provinces: data });
      });
    fetch("http://localhost:8080/api/v1/preference")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ AllPreferencesForAddTask: data });
      });
  }

  handleClose = () => {
    this.setState({ show: false });
    console.log(this.state.show);
    this.setState({
      Date: "",
      Description: "",
      Num_Volunteer: "",
      PostalCode: "",
      Address: "",
      City: "",
      Province: "",
      AddTaskPreferencesID: [],
    });
  };

  handleShow = () => {
    this.setState({ show: true });
    console.log(this.state.show);
  };

  handleApi = (apiCall) => {
    if (this.state.SelectedCities.length !== 0) {
      this.state.SelectedCities.forEach(function (entry) {
        apiCall = apiCall + "city=" + entry + "|";
      });
    }
    if (this.state.SelectedProvinces.length !== 0) {
      this.state.SelectedProvinces.forEach(function (entry) {
        apiCall = apiCall + "prov=" + entry + "|";
      });
    }
    if (this.state.SelectedPreferences.length !== 0) {
      this.state.SelectedPreferences.forEach(function (entry) {
        apiCall = apiCall + "pref=" + entry + "|";
      });
    }
    return apiCall;
  };

  handleSubmit = (event) => {
    console.log(this.state.SelectedCities);
    console.log(this.state.SelectedProvinces);
    console.log(this.state.SelectedPreferences);
    event.preventDefault();
    if (
      this.state.SelectedCities.length !== 0 ||
      this.state.SelectedProvinces.length !== 0 ||
      this.state.SelectedPreferences.length !== 0
    ) {
      var apiCall = "http://localhost:8080/api/v1/task/filter/";
      apiCall = this.handleApi(apiCall);
      console.log(apiCall);
      fetch(apiCall)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ TaskInfo: data });
        })
        .catch(console.log);
    }
  };

  handleAddTask = () => {
    console.log("trying to add task");
    console.log(this.state.AddTaskPreferencesID);
    this.setState({ CreateTime: this.getDate() });
    if (
      this.state.Date === "" ||
      this.state.Description === "" ||
      this.state.Num_Volunteer === "" ||
      this.state.Address === "" ||
      this.state.PostalCode === "" ||
      this.state.Province === "" ||
      this.state.City === ""
    ) {
    } else {
      console.log(this.state.Date);
      console.log(this.state.Description);
      console.log(this.state.Num_Volunteer);
      console.log(this.state.Address);
      console.log(this.state.PostalCode);
      console.log(this.state.Province);
      console.log(this.state.City);

      var apiAddressPostUrl = "http://localhost:8080/api/v1/location/";
      axios
        .post(apiAddressPostUrl, {
          PostalCode: this.state.PostalCode,
          Address: this.state.Address,
          City: this.state.City,
          Province: this.state.Province,
        })
        .then((result) => {
          this.finishAddTask();
        })
        .catch(function (error) {});
    }
  };

  // TODO: need to add additional API call for task has preferences
  finishAddTask = () => {
    var apiTaskPostUrl = "http://localhost:8080/api/v1/task/";
    var randomTaskID = Math.floor(Math.random() * 1000000000);
    console.log(randomTaskID);
    console.log(this.state.CreateTime);
    axios
      .post(apiTaskPostUrl, {
        Task_ID: randomTaskID,
        Date: this.state.Date,
        Description: this.state.Description,
        Num_Volunteer: this.state.Num_Volunteer,
        Status: "Upcoming",
        PostalCode: this.state.PostalCode,
        Address: this.state.Address,
        Username: this.props.username,
        CreateTime: this.state.CreateTime,
      })
      .then((response) => {
        console.log(apiTaskPostUrl);
        console.log(response);
        console.log(response.data);
        if (response.status === 200) {
          if (response.data === "") {
            console.log("POST Successful");
            this.reset();
          } else {
            alert("Invalid information, please check");
          }
        } else {
          console.log("something went wrong");
          alert("Something went wrong, please check the fields and try again");
        }
      })
      .catch(function (error) {
        alert("Something went wrong, please check the fields and try again");
      });
    this.handleClose();
  };

  getDate = () => {
    var date = new Date();
    var day = date.getDate();
    var twoDigitDay = "";
    var month = date.getMonth() + 1;
    var twoDigitMonth = "";
    var year = date.getFullYear();
    if (day < 10) {
      twoDigitDay = "0" + day;
    } else {
      twoDigitDay = day;
    }
    if (month < 10) {
      twoDigitMonth = "0" + month;
    } else {
      twoDigitDay = month;
    }
    return year + "-" + twoDigitMonth + "-" + twoDigitDay;
  };

  reset = () => {
    console.log(this.props.username);
    fetch("http://localhost:8080/api/v1/task/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          TaskInfo: data,
          SelectedCities: [],
          SelectedProvinces: [],
          SelectedPreferences: [],
        });
      });
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((ele) => (ele.checked = false));
  };

  render() {
    console.log(this.state.TaskInfo);

    return (
      <div style={{ display: "table", width: "90%" }}>
        <div
          align="left"
          style={{
            paddingLeft: "5%",
            paddingRight: 20,
            float: "left",
            width: "30%",
            marginTop: "5%",
          }}
        >
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <h3 align={"center"}>Filter</h3>
            <div>
              <h4 style={{ marginLeft: 10 }}> City: </h4>
              {this.state.Cities.map((key) => (
                <div key={key}>
                  <label>
                    <input
                      key={key}
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          SelectedCities: [...this.state.SelectedCities, key],
                        })
                      }
                    />{" "}
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ marginLeft: 10 }}> Province: </h4>
              {this.state.Provinces.map((key) => (
                <div key={key}>
                  <label>
                    <input
                      key={key}
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          SelectedProvinces: [
                            ...this.state.SelectedProvinces,
                            key,
                          ],
                        })
                      }
                    />{" "}
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ marginLeft: 10 }}> Preferences: </h4>
              {this.state.Preferences.map((key) => (
                <div key={key}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        this.setState({
                          SelectedPreferences: [
                            ...this.state.SelectedPreferences,
                            key,
                          ],
                        })
                      }
                    />{" "}
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div align={"center"}>
              <Button type="submit"> Filter </Button>
            </div>
            <div style={{ height: 100 }}></div>
          </form>
        </div>

        <div style={{ paddingRight: 10, float: "right", width: "70%" }}>
          <center>
            <br />
            <h1>Task List</h1>
          </center>

          <Button
            style={{ marginBottom: 5 }}
            type="button"
            onClick={this.reset}
          >
            Show All Tasks
          </Button>

          <Button
            className="request-btn"
            type="button"
            onClick={this.handleShow}
            style={{ marginBottom: "5px", marginLeft: "5px" }}
          >
            Add Task
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Task Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="Date"
                    id="Date"
                    placeholder="Date (YYYY-MM-DD)"
                    onChange={(event) =>
                      this.setState({ Date: event.target.value })
                    }
                  />
                </FormGroup>{" "}
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="textArea"
                    name="Description"
                    id="Description"
                    placeholder="Description"
                    onChange={(event) =>
                      this.setState({ Description: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="Num_Volunteer"
                    id="Num_Volunteer"
                    placeholder="Number of Volunteers Required"
                    onChange={(event) =>
                      this.setState({ Num_Volunteer: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="Address"
                    id="Address"
                    placeholder="Address"
                    onChange={(event) =>
                      this.setState({ Address: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="City"
                    id="City"
                    placeholder="City"
                    onChange={(event) =>
                      this.setState({ City: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="Province"
                    id="Province"
                    placeholder="Province"
                    onChange={(event) =>
                      this.setState({ Province: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <Input
                    type="text"
                    name="PostalCode"
                    id="postaPostalCodelcode"
                    placeholder="Postal Code"
                    onChange={(event) =>
                      this.setState({ PostalCode: event.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: "30px" }}>
                  <label> Preferences: </label>
                  {this.state.AllPreferencesForAddTask.map((key) => (
                    <div
                      key={key.pref_name}
                      style={{ position: "relative", left: "25px" }}
                    >
                      <div>
                        <Input
                          type="checkbox"
                          name={key.pref_name}
                          id={key.pref_name}
                          onChange={(e) =>
                            this.setState({
                              AddTaskPreferencesID: [
                                ...this.state.AddTaskPreferencesID,
                                key.pref_ID,
                              ],
                            })
                          }
                        />
                        <label>
                          {" "}
                          {key.pref_name}: {key.description}{" "}
                        </label>
                      </div>
                    </div>
                  ))}
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                className="request-btn"
                variant="primary"
                onClick={this.handleAddTask}
              >
                Create Task
              </Button>
            </Modal.Footer>
          </Modal>
          <Tasks tasks={this.state.TaskInfo} />
        </div>
      </div>
    );
  }
}

export default GeneralTasksBoard;
