import React, { Component } from "react";
import axios from "axios";


class Reviews extends Component {
	constructor() {
		super()
		this.state = {
			reviewInfo: [],
			volunteerUserName: "",
			taskID: "",
			averageRating: ""
		}
	}

	componentDidMount() {
	 	console.log(this.props.username)
		fetch("http://localhost:8080/api/v1/review/")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ reviewInfo: data });
		    })
		    .catch(console.log);
	}

	handleSubmitVolunteer = (event) => {
		console.log(this.state.volunteerUserName)
		event.preventDefault()

		axios.get("http://localhost:8080/api/v1/review/volunteer=" + this.state.volunteerUserName)
			 .then(result => {
			 	console.log(result)
			 	console.log(result.data)
			 	this.setState({reviewInfo: result.data})
			 })
			 .catch(function(error) {
			          alert("Something went wrong, please check the fields and try again");
			        });

		axios.get("http://localhost:8080/api/v1/review/averageRating/volunteer=" + this.state.volunteerUserName)
			 .then(response => {
			 	console.log(response)
			 	console.log(response.data)
			 	this.setState({averageRating: response.data})
			 })
			 .catch(function(error) {
			          alert("Something went wrong, please check the fields and try again");
			        });

		var showStat = document.getElementById("filterStats")
		showStat.style.display = "block"
	}
	
	handleSubmitTask = (event) => {
		console.log(this.state.taskID)
		event.preventDefault()

		axios.get("http://localhost:8080/api/v1/review/task_ID=" + this.state.taskID)
			 .then(result => {
			 	console.log(result)
			 	console.log(result.data)
			 	this.setState({reviewInfo: result.data})
			 })
			 .catch(function(error) {
			          alert("Something went wrong, please check the fields and try again");
			        });

		axios.get("http://localhost:8080/api/v1/review/averageRating/task_ID=" + this.state.taskID)
			 .then(response => {
			 	console.log(response)
			 	console.log(response.data)
			 	this.setState({averageRating: response.data})
			 })
			 .catch(function(error) {
			          alert("Something went wrong, please check the fields and try again");
			        });

		var showStat = document.getElementById("filterStats")
		showStat.style.display = "block"

	}

	handleReset = () => {
		fetch("http://localhost:8080/api/v1/review/")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ reviewInfo: data });
		    })
		var showStat = document.getElementById("filterStats")
		showStat.style.display = "none"
	}

  	render() {
	    return (
	    	<div>
	    		<h3>filter</h3>
		    	<form onSubmit={event => this.handleSubmitVolunteer(event)}>
		    		{['volunteerUserName'].map(key => (
		    			<div>
			    			<label> Volunteer User Name: </label>
							<select onChange={(e) => this.setState({ [key]: e.target.value})} key={key}>
							  	{this.state.reviewInfo.map(({ [key]: value }) => 
							   	<option key={value}>{value}</option>)}
							</select>
						</div>
					))}
					<button type="submit"> Filter By Volunteer </button>
		    	</form>

		    	<form onSubmit={event => this.handleSubmitTask(event)}>
		    		{['taskID'].map(key => (
		    			<div>
			    			<label> Task ID: </label>
							<select onChange={(e) => this.setState({ [key]: e.target.value})} key={key}>
							  	{this.state.reviewInfo.map(({ [key]: value }) => 
							   	<option key={value}>{value}</option>)}
							</select>
						</div>
					))}
					<button type="submit"> Filter By Task ID </button>
		    	</form>
		    	<button type="button" onClick = {this.handleReset}> Reset </button>
		    <div id="filterStats" style={{display: "none"}}>
		    	<h6>Average Rating: {this.state.averageRating}</h6>
		    </div>
		     <center>
		        <h1>Review</h1>
		     </center>
		      {this.state.reviewInfo.map(review => (
		        <div key={review.taskID} className="card">
		          <div className="card-body">
		            <h5 className="card-title">{review.description}</h5>
		            <h6 className="card-subtitle mb-2 text-muted">
		              Rating: {review.rating}
		            </h6>
		            <p className="card-text"> Volunteer: {review.volunteerUserName}</p>
		          </div>
		        </div>
		      ))}
		    </div>
  		);
  	}
}

export default Reviews;