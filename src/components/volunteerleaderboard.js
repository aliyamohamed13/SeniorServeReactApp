import React, { Component } from "react";


class VolunteerLeaderBoard extends Component {
	constructor() {
		super()
		this.state = {
			ratingRanking: [],
			hoursRanking: [],
			volunteerAllSenior: []
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/review/allAverageRating")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ ratingRanking: data });
		    })
		fetch("http://localhost:8080/api/v1/volunteerRecord/allUserRatingHours")
			.then(res => res.json())
		    .then(data => {
		       this.setState({ hoursRanking: data });
		    })
		fetch("http://localhost:8080/api/v1/user/volunteerAllSenior")
			.then(res => res.json())
		    .then(data => {
		       this.setState({ volunteerAllSenior: data });
		    })
	}




	render() {
		console.log(this.state.hoursRanking)
	    return (
	    	<div >
	    		
	    		<h1>Snapshot of Volunteer Achievements</h1>

	    		<div style={{ width: '75%', margin: 'auto'}}>
		    		<div>
			    		<table style={{float: 'left'}}>
				    		<thead>
				    			<th colSpan="2">Top 5 Highest Rated Volunteers</th>
				    		</thead>
				    		<thead>
				    			<th>Volunteer</th>
				    			<th>Rating</th>
				    		</thead>
				    		{this.state.ratingRanking.map(volunteerRating => (
				    			<tbody>
				    				<td>{volunteerRating.username}</td>
				    				<td>{volunteerRating.rating}</td>
				    			</tbody>
				    		))}
			    		</table>

			    		<table style={{float: 'right'}}>
				    		<thead>
				    			<th colSpan="3">Top 5 Volunteers With Most Hours</th>
				    		</thead>
				    		<thead>
				    			<th>Volunteer</th>
				    			<th>Hours</th>
				    			<th>Rating</th>
				    		</thead>
				    		{this.state.hoursRanking.map(hoursRating => (
				    			<tbody>
				    				<td>{hoursRating.username}</td>
				    				<td>{hoursRating.totalHours}</td>
				    				<td>{hoursRating.rating}</td>
				    			</tbody>
				    		))}
			    		</table>
		    		</div>
		    		<div style={{float: 'right', marginTop: '30%', marginRight: '10%'}} >
			    		<table>
				    		<thead>
				    			<th colSpan="3">Volunteers Who Have Volunteered with All The Seniors</th>
				    		</thead>
				    		<thead>
				    			<th>Username</th>
				    			<th>First Name</th>
				    			<th>Last Name</th>
				    		</thead>
				    		{this.state.volunteerAllSenior.map(hoursRating => (
				    			<tbody>
				    				<td>{hoursRating.username}</td>
				    				<td>{hoursRating.firstName}</td>
				    				<td>{hoursRating.lastName}</td>
				    			</tbody>
				    		))}
			    		</table>
		    		</div>
	    		</div>
	    	</div>
	    )
	}
}

export default VolunteerLeaderBoard;