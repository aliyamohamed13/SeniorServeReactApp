import React, { Component } from "react";
import axios from "axios";
import {Modal, Button} from 'react-bootstrap';
import {
  Form,
  FormGroup,
  Input
} from "reactstrap";

class TasksBoard extends Component {

	constructor() {
		super()
		this.state = {
			userTaskInfo: [],
			taskToBeUpdated:[],

			show: false,

			Task_ID :"",
			Date: "",
	        Description: "",
	        Num_Volunteer: "",
	        Status: "",
	        PostalCode: "",
	        Address: "",
	        City: "",
	        Province: "",
	        CreateTime: "",
	        Username: ""
		}
	}

 	componentDidMount() {
 		console.log(this.props.username)
	    fetch("http://localhost:8080/api/v1/task/username=" + this.props.username)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({ userTaskInfo: data });
	      })
	      .catch(console.log);
  	}

  	handleDeleteTask = (taskID) => {
  		console.log(taskID)
  		var taskDeleteUrl = "http://localhost:8080/api/v1/task/task_ID=" + taskID
  		axios.delete(taskDeleteUrl, {})
  			 .then(response => {
  			 	console.log("task deleted!")
  			 	this.reset();
  			 })
  			 .catch(error => {
  			 	console.log("there was problem deleting")
  			 })
  	}

  	handleClose = () => {
		this.setState({show: false});
		console.log(this.state.show)
		this.setState({Date: "",
				       Description: "",
				       Num_Volunteer: "",
				       PostalCode: "",
				       Address: "",
				       City: "",
	        		   Province: "",
	        		   Status: "",
	        		   CreateTime: ""})

	}

  	handleUpdateTask =(task) => {
  		console.log(task)
  		this.setState({	Task_ID: task.Task_ID,
  						Date: task.Date,
  						Description: task.Description,
				        Num_Volunteer: task.Num_Volunteer,
				        PostalCode: task.PostalCode,
				        Address: task.Address,
				        City: task.City,
	        		   	Province: task.Province,
				        Status: task.Status,
	        		   	CreateTime: task.CreateTime,
	        		   	Username: task.Username,
				    	show: true})

  	}

  	handlePostTask = () => {
  		var updateUrl = "http://localhost:8080/api/v1/location"
  		axios.post(updateUrl, {
	    			"PostalCode": this.state.PostalCode,
	    			"Address": this.state.Address,
	    			"City": this.state.City,
	    			"Province": this.state.Province
	    			})
	    		.then(result => {
	    			this.finishUpdateTask()
	    		})
	    		.catch(function(error) {
					
				});
  	}

  	finishUpdateTask = () => {
  		var putUpdateString = "http://localhost:8080/api/v1/task/"
  		console.log("updating...")
  		axios.put(putUpdateString, {
		  			"Task_ID": this.state.Task_ID,
					"Date": this.state.Date,
					"Description": this.state.Description,
					"Num_Volunteer": this.state.Num_Volunteer,
					"Status": this.state.Status,
					"PostalCode": this.state.PostalCode,
					"Address": this.state.Address,
					"Username": this.state.Username,
					"CreateTime": this.state.CreateTime
  					})
		  		.then(response => {
					if (response.status === 200) {
						if (response.data === 1) {
							console.log("POST Successful");
							this.reset();
							this.handleClose();
						} else {
							alert("Something went wrong, please check the fields and try again");
						}
					} else {
						console.log("something went wrong");
						alert("Something went wrong, please check the fields and try again");
					}})
				.catch(function(error) {
					alert("Something went wrong, please check the fields and try again");
				});
  	}

  	reset = () => {
		axios.get("http://localhost:8080/api/v1/task/username=" + this.props.username)
		     .then(res => {
		     	console.log("reset!")
		     	this.setState({ userTaskInfo: res.data });
		     })
		     .catch()
  	}

	render() {
	  	
		console.log(this.state.userTaskInfo)	

	    return (
	    	<div>
				<center>
					<h1>My Tasks</h1>
				</center>
				{this.state.userTaskInfo.map(task => (
					<div key={task.Task_ID} className="card">
						<div className="card-body">
							<h5 className="card-title">{task.Description}</h5>
							<h6 className="card-subtitle mb-2 text-muted">
								{task.Date} status: {task.Status}
							</h6>
							<p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
						<button type="button" onClick={() => this.handleDeleteTask(task.Task_ID)}>
						Delete Task
						</button>
						<button type="button" onClick={() => this.handleUpdateTask(task)}>
						Update Task
						</button>

						<Modal show={this.state.show} onHide={this.handleClose}>
					        <Modal.Header closeButton>
					          <Modal.Title>Task Information</Modal.Title>
					        </Modal.Header>
					        <Modal.Body>
					        <Form>
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Date:
					                <Input
					                  type="text"
					                  name="Date"
					                  id="Date"
					                  value={this.state.Date}
					                  placeholder="Date (YYYY-MM-DD)"
					                  onChange={event =>
					                    this.setState({ Date: event.target.value })
					                  }
					                />
					              </FormGroup>{" "}
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Description:
					                <Input
					                  type="textArea"
					                  name="Description"
					                  id="Description"
					                  placeholder="Description"
					                  value={this.state.Description}
					                  onChange={event =>
					                    this.setState({ Description: event.target.value })
					                  }
					                />
					              </FormGroup>
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Number of Volunteers:
					                <Input
					                  type="text"
					                  name="Num_Volunteer"
					                  id="Num_Volunteer"
					                  placeholder="Number of Volunteers Required"
					                  value={this.state.Num_Volunteer}
					                  onChange={event =>
					                    this.setState({ Num_Volunteer: event.target.value })
					                  }
					                />
					              </FormGroup>
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Address:
					                <Input
					                  type="text"
					                  name="Address"
					                  id="Address"
					                  placeholder="Address"
					                  value={this.state.Address}
					                  onChange={event =>
					                    this.setState({ Address: event.target.value })
					                  }
					                />
					              </FormGroup>
					              City:
					               <FormGroup style={{ marginBottom: "30px" }}>
					                <Input
					                  type="text"
					                  name="City"
					                  id="City"
					                  value={this.state.City}
					                  placeholder="City"
					                  onChange={event =>
					                    this.setState({ City: event.target.value })
					                  }
					                />
					              </FormGroup>
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Province:
					                <Input
					                  type="text"
					                  name="Province"
					                  id="Province"
					                  placeholder="Province"
					                  value={this.state.Province}
					                  onChange={event =>
					                    this.setState({ Province: event.target.value })
					                  }
					                />
					              </FormGroup>
					              <FormGroup style={{ marginBottom: "30px" }}>
					              PostalCode:
					                <Input
					                  type="text"
					                  name="PostalCode"
					                  placeholder="Postal Code"
					                  id="PostalCode"
					                  value={this.state.PostalCode}
					                  onChange={event =>
					                    this.setState({ PostalCode: event.target.value })
					                  }
					                />
					              </FormGroup> 
					              <FormGroup style={{ marginBottom: "30px" }}>
					              Status:
					                <Input
					                  type="text"
					                  name="Status"
					                  placeholder="Current Status"
					                  id="status"
					                  value={this.state.Status}
					                  onChange={event =>
					                    this.setState({ Status: event.target.value })
					                  }
					                />
					              </FormGroup> 
					            </Form>
					        </Modal.Body>
					        <Modal.Footer>
					          <Button variant="secondary" onClick={this.handleClose}>
					            Close
					          </Button>
					          <Button variant="primary" onClick={this.handlePostTask}>
					            Update Task
					          </Button>
					        </Modal.Footer>
					    </Modal>
						</div>
					</div>
				))}
			</div>
	    )
	}
}

export default TasksBoard;
