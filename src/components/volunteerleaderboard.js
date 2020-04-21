import React, { Component } from "react";
import { Container, Row, Col } from 'react-grid-system'

class VolunteerLeaderBoard extends Component {
	constructor() {
		super()
		this.state = {
			ratingRanking: [],
			hoursRanking: [],
			volunteerAllSenior: [],
			volunteerAllPref: [],
			volunteerAllReview: []
		}
	}

	componentDidMount() {
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/review/allAverageRating")
			.then(res => res.json())
			.then(data => {
				this.setState({ ratingRanking: data });
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/volunteerRecord/allUserRatingHours")
			.then(res => res.json())
			.then(data => {
				this.setState({ hoursRanking: data });
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/volunteerAllSenior")
			.then(res => res.json())
			.then(data => {
				this.setState({ volunteerAllSenior: data });
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/volunteerAllPref")
			.then(res => res.json())
			.then(data => {
				this.setState({ volunteerAllPref: data });
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/user/volunteerAllReviewTask")
			.then(res => res.json())
			.then(data => {
				this.setState({ volunteerAllReview: data });
			})
	}

	render() {
		console.log(this.state.hoursRanking)
		return (
			<div >
				<br />
				<h1>Snapshot of Volunteer Achievements</h1>
				<Container style={{ justifyContent: 'center', maxWidth: '70%' }}>
					<Row>
						<Col>
							<table>
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
						</Col>

						<Col>
							<table>
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
						</Col>
					</Row>

					<Row style={{ paddingTop: "5%" }}>
						<Col>
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
							</table >
						</Col>
						<Col>
							<table >
								<thead>
									<th colSpan="3">Volunteered for all Task Preferences</th>
								</thead>
								<thead>
									<th>Username</th>
									<th>First Name</th>
									<th>Last Name</th>
								</thead>
								{this.state.volunteerAllPref.map(hoursRating => (
									<tbody>
										<td>{hoursRating.username}</td>
										<td>{hoursRating.firstName}</td>
										<td>{hoursRating.lastName}</td>
									</tbody>
								))}
							</table>
						</Col>
						<Col>
							<table>
								<thead>
									<th colSpan="3">Been Reviewed for all their Volunteer Tasks</th>
								</thead>
								<thead>
									<th>Username</th>
									<th>First Name</th>
									<th>Last Name</th>
								</thead>
								{this.state.volunteerAllReview.map(hoursRating => (
									<tbody>
										<td>{hoursRating.username}</td>
										<td>{hoursRating.firstName}</td>
										<td>{hoursRating.lastName}</td>
									</tbody>
								))}
							</table>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}


export default VolunteerLeaderBoard;
