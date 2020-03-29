import React, { Component } from "react";


class VolunteerLeaderBoard extends Component {
	constructor() {
		super()
		this.state = {
			leaderboard: []
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/review/allAverageRating")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ leaderboard: data });
		    })
	}




	render() {
	    return (
	    	<div>
	    		<h1>Snapshot of Volunteer Achievements</h1>
	    		<table>
		    		<thead>
		    			<th colSpan="2">Top 5 Highest Rated Volunteers</th>
		    		</thead>
		    		<thead>
		    			<th>Volunteer</th>
		    			<th>Rating</th>
		    		</thead>
		    		{this.state.leaderboard.map(volunteerRating => (
		    			<tbody>
		    				<td>{volunteerRating.username}</td>
		    				<td>{volunteerRating.rating}</td>
		    			</tbody>
		    		))}
	    		</table>
	    	</div>
	    )
	}
}

export default VolunteerLeaderBoard;