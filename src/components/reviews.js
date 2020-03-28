import React, { Component } from "react";


class Reviews extends Component {
	constructor() {
		super()
		this.state = {
			reviewInfo: [],
			volunteerUserName: "",
			taskID: ""
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

	handleSubmit = (event) => {
		console.log(this.state.volunteerUserName)
		console.log(this.state.taskID)
		console.log(this.state.reviewInfo)
		event.preventDefault()

	}

	handleChange = (event) => {
		console.log(event)
		this.setState({taskID: event.target.value})
	}

  	render() {
	    return (
	    	<div>
		    	<form onSubmit={event => this.handleSubmit(event)}>
		    		<h3>filter</h3>
		    			  {['volunteerUserName', 'taskID'].map(key => (
		    			  	<div>
			    			  	<label> {key}: </label>
							    <select onChange={(e) => this.setState({[key]: e.target.value})} key={key}>
							    {this.state.reviewInfo.map(({ [key]: value }) => 
							    	<option key={value}>{value}
                					</option>)}
							    </select>
						    </div>
						  ))}
					<button type="submit"> Filter </button>
		    	</form>

		    
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