import React, { Component } from "react";
import axios from "axios";

class TasksBoard extends Component {

	constructor() {
		super()
		this.state = {
			userTaskInfo: []
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
					<h1>Tasks List</h1>
				</center>
				{this.state.userTaskInfo.map(task => (
					<div key={task.Task_ID} className="card">
						<div className="card-body">
							<h5 className="card-title">{task.Description}</h5>
							<h6 className="card-subtitle mb-2 text-muted">
								{task.Date} status: {task.Status}
							</h6>
							<p className="card-text">{task.Address} {task.PostalCode}</p>
						<button type="button" onClick={() => this.handleDeleteTask(task.Task_ID)}>
						Delete Task
						</button>
						</div>
					</div>
				))}
			</div>
	    )
	}
}

export default TasksBoard;
