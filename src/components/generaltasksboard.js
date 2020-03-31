import React, { Component } from "react";
import Tasks from './tasks'
import {Modal, Button} from 'react-bootstrap';
import axios from "axios";
import {
  Form,
  FormGroup,
  Input
} from "reactstrap";


class GeneralTasksBoard extends Component {
	constructor() {
		super()
		this.state = {
			TaskInfo: [],
// TODO populate with API calls
			Cities: ['Toronto', 'Vancouver', 'Calgary', 'Edmonton', 'Waterloo','Quebec', 'Burnaby', 'London'],
			Provinces: ['ON', 'BC', 'AB', 'QC'],
			Preferences: ['Outdoors', 'Indoors', 'Labour', 'Social', 'Behind the Scenes'],

			SelectedCities:[],
			SelectedProvinces:[],
			SelectedPreferences:[],

			show: false,

			Date: "",
	        Description: "",
	        Num_Volunteer: "",
	        PostalCode: "",
	        Address: "",
	        City: "",
	        Province: ""
		}
	}

	componentDidMount() {
	 	console.log(this.props.username)
		fetch("http://localhost:8080/api/v1/task/")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ TaskInfo: data });
		    })
		    .catch(console.log);
	}

	handleClose = () => {
		this.setState({show: false});
		console.log(this.state.show)
		this.setState({Date: "",
				       Description: "",
				       Num_Volunteer: "",
				       PostalCode: "",
				       Address: ""})

	}

  	handleShow = () => {
  		this.setState({show: true});
  		console.log(this.state.show)
  	}

	handleApi = (apiCall) => {
		if (this.state.SelectedCities.length !== 0)
		{
			this.state.SelectedCities.forEach(function(entry) {
				apiCall = apiCall + "city=" + entry + "|"
			})
		}
		if (this.state.SelectedProvinces.length !== 0)
		{
			this.state.SelectedProvinces.forEach(function(entry) {
				apiCall = apiCall + "prov=" + entry + "|"
			})
		}
		if (this.state.SelectedPreferences.length !== 0)
		{
			this.state.SelectedPreferences.forEach(function(entry) {
				apiCall = apiCall + "pref=" + entry + "|"
			})
		}
		return apiCall
	}

	handleSubmit = (event) => {
		console.log(this.state.SelectedCities)
		console.log(this.state.SelectedProvinces)
		console.log(this.state.SelectedPreferences)
		event.preventDefault()
		if(this.state.SelectedCities.length !== 0 || this.state.SelectedProvinces.length !== 0 || this.state.SelectedPreferences.length !== 0)
		{
		var apiCall = "http://localhost:8080/api/v1/task/filter/"
		apiCall = this.handleApi(apiCall);
		console.log(apiCall)
		fetch(apiCall)
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ TaskInfo: data, SelectedCities:[], SelectedProvinces:[], SelectedPreferences:[]});
		    })
		    .catch(console.log);
		}
		document.querySelectorAll('input[type=checkbox]')
				.forEach( ele => ele.checked = false );
	}

	handleAddTask = () => {
		console.log("trying to add task")
		this.setState({CreateTime: this.getDate()})
		if ((this.state.Date === "") ||
		    (this.state.Description === "") ||
		    (this.state.Num_Volunteer === "") ||
		    (this.state.Address === "") ||
		    (this.state.PostalCode === "") ||
		    (this.state.Province === "") ||
		    (this.state.City === "")){
	    } else {
	    	console.log(this.state.Date)
	    	console.log(this.state.Description)
	    	console.log(this.state.Num_Volunteer)
	    	console.log(this.state.Address)
	    	console.log(this.state.PostalCode)
	    	console.log(this.state.Province)
	    	console.log(this.state.City)

	    	var apiAddressPostUrl = "http://localhost:8080/api/v1/location/"
	    	axios.post(apiAddressPostUrl, {
	    			"PostalCode": this.state.PostalCode,
	    			"Address": this.state.Address,
	    			"City": this.state.City,
	    			"Province": this.state.Province
	    			})
	    		.then(result => {
	    			this.finishAddTask()
	    		})
	    		.catch(function(error) {

				});
	    }
	}

	finishAddTask = () => {
		var apiTaskPostUrl = "http://localhost:8080/api/v1/task/"
		var randomTaskID = Math.floor(Math.random() * 1000000000)
		console.log(randomTaskID)
		console.log(this.state.CreateTime)
			axios.post(apiTaskPostUrl, {
				"Task_ID": randomTaskID,
				"Date": this.state.Date,
				"Description": this.state.Description,
				"Num_Volunteer": this.state.Num_Volunteer,
				"Status": "Upcoming",
				"PostalCode": this.state.PostalCode,
				"Address": this.state.Address,
				"Username": this.props.username,
				"CreateTime": this.state.CreateTime
				})
				.then(response => {
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
					}})
				.catch(function(error) {
					alert("Something went wrong, please check the fields and try again");
				});
		this.handleClose();
	}

	getDate = () => {
		var date = new Date()
		var day = date.getDate()
		var twoDigitDay = ""
		var month = date.getMonth() + 1
		var twoDigitMonth = ""
		var year = date.getFullYear()
		if (day < 10) {
			twoDigitDay = "0" + day
		} else {
			twoDigitDay = day
		}
		if (month < 10) {
			twoDigitMonth = "0" + month
		} else {
			twoDigitDay = month
		}
		return year + "-" + twoDigitMonth + "-" + twoDigitDay
	}

	reset = () => {
		console.log(this.props.username)
		fetch("http://localhost:8080/api/v1/task/")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ TaskInfo: data });
		    })
	}


	render() {

		console.log(this.state.TaskInfo)

	    return (
	    	<div>
				<div style={{float: 'left'}}>
					<form onSubmit={event => this.handleSubmit(event)}>
						<h3>filter</h3>
							<div>
							<h4> City: </h4>
							{this.state.Cities.map((key => (
								<div>
									<label> {key}:
										<input type="checkbox" onChange={(e) => this.setState({SelectedCities: [...this.state.SelectedCities, key]})} />
									</label>
								</div>
							  )))}
							</div>
							<div>
							<h4> Province: </h4>
							{this.state.Provinces.map((key => (
								<div>
									<label> {key}:
										<input type="checkbox" onChange={(e) => this.setState({SelectedProvinces: [...this.state.SelectedProvinces, key]})} />
									</label>
								</div>
							  )))}
							</div>
							<div>
							<h4> Preferences: </h4>
							{this.state.Preferences.map((key => (
								<div>
									<label> {key}:
										<input type="checkbox" onChange={(e) => this.setState({SelectedPreferences: [...this.state.SelectedPreferences, key]})} />
									</label>
								</div>
							  )))}
							</div>
						<button type="submit"> Filter </button>
					</form>
				</div>

				<div style={{float:'left'}}>
					<button type="button" onClick={this.handleShow}>
						Add Task
					</button>
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
								  onChange={event =>
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
								  onChange={event =>
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
								  onChange={event =>
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
								  onChange={event =>
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
								  onChange={event =>
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
								  onChange={event =>
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
								  onChange={event =>
									this.setState({ PostalCode: event.target.value })
								  }
								/>
							  </FormGroup>
							</Form>
						</Modal.Body>
						<Modal.Footer>
						  <Button variant="secondary" onClick={this.handleClose}>
							Close
						  </Button>
						  <Button variant="primary" onClick={this.handleAddTask}>
							Create Task
						  </Button>
						</Modal.Footer>
					</Modal>
					<Tasks tasks={this.state.TaskInfo} />
				</div>
		    </div>
	    )
	}

}

export default GeneralTasksBoard;
