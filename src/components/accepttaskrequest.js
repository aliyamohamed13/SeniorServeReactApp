import React, { Component } from "react";
import axios from "axios";

class TaskRequest extends Component {

	constructor() {
		super()
		this.state = {
			pendingTaskRequests:[]
		}
	}

	componentDidMount() {
		console.log(this.props)
		//TODO: add correct endpoint which shows all of the Senior's task request
	    fetch("http://localhost:8080/api/v1/taskrequest/allRequestUser/task_id=" + this.props.taskID)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({ pendingTaskRequests: data });
	      })
	      .catch(console.log);
	}

	handleAcceptRequest = (username) => {
		console.log(username)
  		var postUrl = "http://localhost:8080/api/v1/volunteer"
	  	axios.post(postUrl, {
		    		"username": username,
		    		"taskID": this.props.taskID,
		    		"date": this.getDate()
		    		})
		      .then(result => {
		    		this.reset();
		    	})
		      .catch(function(error) {
						
				});
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
		axios.get("http://localhost:8080/api/v1/taskrequest/allRequestUser/task_id=" + this.props.taskID)
		     .then(result => {
		     	console.log("reset!")
		     	this.setState({ pendingTaskRequests: result.data });
		     })
		     .catch()
	}


	render() {
		console.log(this.state.pendingTaskRequests)
		return (
				<div>
					{this.state.pendingTaskRequests.map(request => (
						<div key={request.username}>
							<h6> Request From: {request.username} </h6>
							<p> Volunteer Rating: {request.rating}
							<br /> Total Hours Committed: {request.totalHours}</p>
							<button onClick={event => this.handleAcceptRequest(request.username)}>
								Accept Requst
							</button>
						</div>
						))}
				</div>	
		)

	}
}
export default TaskRequest;