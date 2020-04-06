import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

class TaskRequestVolunteer extends Component {
	constructor() {
		super()
		this.state = {
			buttonText: "Make Request"
		}
	}


	handleRequestClick = () => {
		console.log(this.props.status)
		console.log(this.props.taskID)
		console.log(this.props.username)
		var postUrl = "http://localhost:8080/api/v1/taskrequest"
		var randomRequestID = Math.floor(Math.random() * 1000000000)
		axios.post(postUrl, {
				    	"request_ID": randomRequestID,
				    	"date": this.getDate(),
				    	"task_ID": this.props.taskID,
				    	"username": this.props.username
				    })
			.then(result => {
				if (result.status === 200) {
					console.log("POST Successful");
					this.setState({buttonText: "Request Sent!"})
				} else {
					alert("Something went wrong, please try again later");
				}})
			.catch(function(error) {
				alert("Something went wrong, please try again later");
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


	render() {

		let requestButton

		if (this.props.status !== "Completed" && this.props.status !== "completed")
		{
			requestButton = (
				<Button style={{margin:"20px"}} id={this.props.taskID} onClick={(e) => this.handleRequestClick()}>
					{this.state.buttonText}
				</Button>
			)
		} else {
			requestButton = "";
		}


		return (
			<div>

				{requestButton}

			</div>
		)
	}

}
export default TaskRequestVolunteer;
