import React, { Component } from "react";
import axios from "axios";

class TasksBoardVolunteer extends Component {
	constructor() {
		super()
		this.state = {
			requestedTasks: []
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/taskrequest/allTask/username=" + this.props.username)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({ requestedTasks: data });
	      })
	}


	render() {
		return (
			<div>
				<center>
					<h1>My Requested Tasks</h1>
				</center>
				{this.state.requestedTasks.map(task => (
				<div key={task.Task_ID} className="card">
					<div className="card-body">
						<h5 className="card-title">{task.Description}</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							{task.Date} status: {task.Status}
						</h6>
					<p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
					</div>
				</div>
				))}
			</div>
		)
	}
	

}

export default TasksBoardVolunteer;