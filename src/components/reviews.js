import React, { Component } from "react";


class Reviews extends Component {
	constructor() {
		super()
		this.state = {
			reviewInfo: []
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

  	render() {
	    return (
	    	<div>
		    	<form>
		    		<h3>filter</h3>
		    			  {['volunteerUserName', 'rating', 'taskID'].map(key => (
						    <select key={key}>
						      {this.state.reviewInfo.map(({ [key]: value }) => <option key={value}>{value}</option>)}
						    </select>
						  ))}
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