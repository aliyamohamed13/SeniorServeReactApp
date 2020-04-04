import React, { Component } from "react";
import axios from "axios";


class Reviews extends Component {
	constructor() {
		super()
		this.state = {
			reviewInfo: [],
			volunteers: [],
			seniors:[],
			volunteerUserName: "",
			seniorUsername: "",
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
		fetch("http://localhost:8080/api/v1/review/distinctUsersWithReviews")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ volunteers: data });
		    })
		    .catch(console.log);
		fetch("http://localhost:8080/api/v1/user/seniorUsername")
			.then(res => res.json())
		    .then(data => {
		       this.setState({ seniors: data });
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
	
	handleSubmitSenior = (event) => {
		console.log(this.state.taskID)
		event.preventDefault()

		axios.get("http://localhost:8080/api/v1/review/senior=" + this.state.seniorUsername)
			 .then(result => {
			 	console.log(result)
			 	console.log(result.data)
			 	this.setState({reviewInfo: result.data})
			 })
			 .catch(function(error) {
			          alert("Something went wrong, please check the fields and try again");
			        });

		axios.get("http://localhost:8080/api/v1/review/averageRating/senior=" + this.state.seniorUsername)
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
		this.setState({reviewInfo: []})
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
		    		<div>
			    		<label> Volunteer User Name: </label>
						<select onChange={(e) => this.setState({ volunteerUserName: e.target.value})} key={'volunteerUserName'}>
							{this.state.volunteers.map(key => (
							   	<option key={key}>{key}</option>))}
						</select>
						{"   "}
						<button type="submit"> Filter By Volunteer </button>
					</div>
		    	</form>

		    	<form onSubmit={event => this.handleSubmitSenior(event)}>
		    			<div>
			    			<label> Senior Username: </label>
							<select onChange={(e) => this.setState({ seniorUsername: e.target.value})} key={'seniorUserName'}>
							{this.state.seniors.map(key => (
							   	<option key={key}>{key}</option>))}
						</select>
						{"   "}
							<button type="submit"> Filter By Senior </button>
						</div>
		    	</form>
		    	<button type="button" onClick = {this.handleReset}> Reset </button>
		    <div id="filterStats" style={{display: "none"}}>
		    	<h6>Average Rating: {this.state.averageRating}</h6>
		    </div>
		     <center>
		        <h1>Review</h1>
		     </center>
		      {this.state.reviewInfo.map(review => (
		        <div key={review.taskID+review.volunteerUserName} className="card">
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