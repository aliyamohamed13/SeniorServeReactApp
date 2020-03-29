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
		    		<tr>
		    			<th colspan="2">Highest Rated Volunteers</th>
		    		</tr>
		    		<tr>
		    			<th>Volunteer</th>
		    			<th>Rating</th>
		    		</tr>
		    		{this.state.leaderboard.map(volunteerRating => (
		    			<tr>
		    				<td>{volunteerRating.username}</td>
		    				<td>{volunteerRating.rating}</td>
		    			</tr>
		    		))}
	    		</table>
	    	</div>
	    )
	}
}

export default VolunteerLeaderBoard;