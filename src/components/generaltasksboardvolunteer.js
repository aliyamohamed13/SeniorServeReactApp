import React, { Component } from "react";
import TaskRequestVolunteer from './taskrequestvolunteer';
import { Button, Container } from "reactstrap";


class GeneralTasksBoardVolunteer extends Component {
	constructor() {
		super()
		this.state = {
			TaskInfo: [],

			Cities: [],
			Provinces: [],
			Preferences: [],

			SelectedCities: [],
			SelectedProvinces: [],
			SelectedPreferences: [],

			AllPreferencesForAddTask: [],
		}
	}

	componentDidMount() {
		console.log(this.props.username)
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/task/")
			.then(res => res.json())
			.then(data => {
				this.setState({ TaskInfo: data });
			})
			.catch(console.log);
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/preference/getAllPreferenceNames")
			.then(res => res.json())
			.then(data => {
				this.setState({ Preferences: data })
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/location/getAllCities")
			.then(res => res.json())
			.then(data => {
				this.setState({ Cities: data })
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/location/getAllProvinces")
			.then(res => res.json())
			.then(data => {
				this.setState({ Provinces: data })
			})
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/preference")
			.then(res => res.json())
			.then(data => {
				this.setState({ AllPreferencesForAddTask: data })
			})
	}

	handleApi = (apiCall) => {
		if (this.state.SelectedCities.length !== 0) {
			this.state.SelectedCities.forEach(function (entry) {
				apiCall = apiCall + "city=" + entry + "|"
			})
		}
		if (this.state.SelectedProvinces.length !== 0) {
			this.state.SelectedProvinces.forEach(function (entry) {
				apiCall = apiCall + "prov=" + entry + "|"
			})
		}
		if (this.state.SelectedPreferences.length !== 0) {
			this.state.SelectedPreferences.forEach(function (entry) {
				apiCall = apiCall + "pref=" + entry + "|"
			})
		}
		return apiCall
	}

	handleSubmit = (event) => {
		console.log(this.state.SelectedCities)
		console.log(this.state.SelectedProvinces)
		console.log(this.state.SelectedPreferences)
		event.preventDefault()
		if (this.state.SelectedCities.length !== 0 || this.state.SelectedProvinces.length !== 0 || this.state.SelectedPreferences.length !== 0) {
			var apiCall = "https://seniorserve-spring-postgres.herokuapp.com/api/v1/task/filter/"
			apiCall = this.handleApi(apiCall);
			console.log(apiCall)
			fetch(apiCall)
				.then(res => res.json())
				.then(data => {
					this.setState({ TaskInfo: data });
				})
				.catch(console.log);
		}
	}

	reset = () => {
		console.log(this.props.username)
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/task/")
			.then(res => res.json())
			.then(data => {
				this.setState({ TaskInfo: data, SelectedCities: [], SelectedProvinces: [], SelectedPreferences: [] });
			})
		document.querySelectorAll('input[type=checkbox]')
			.forEach(ele => ele.checked = false);
	}


	render() {

		console.log(this.state.TaskInfo)

		return (
			<div style={{ display: 'table', width: '90%' }}>
				<div align="left" style={{ paddingLeft: '5%', paddingRight: 20, float: 'left', width: '30%', marginTop: '5%' }}>
					<form onSubmit={event => this.handleSubmit(event)}>
						<h3 align={"center"}>Filter</h3>
						<div>
							<h4 style={{ marginLeft: 10 }}> City: </h4>
							{this.state.Cities.map((key => (
								<div key={key}>
									<label>
										<input type="checkbox" onChange={(e) => this.setState({ SelectedCities: [...this.state.SelectedCities, key] })} />
										{" "}{key}
									</label>
								</div>
							)))}
						</div>
						<div>
							<h4 style={{ marginLeft: 10 }} > Province: </h4>
							{this.state.Provinces.map((key => (
								<div key={key}>
									<label>
										<input type="checkbox" onChange={(e) => this.setState({ SelectedProvinces: [...this.state.SelectedProvinces, key] })} />
										{" "}{key}
									</label>
								</div>
							)))}
						</div>
						<div>
							<h4 style={{ marginLeft: 10 }}> Preferences: </h4>
							{this.state.Preferences.map((key => (
								<div key={key}>
									<label>
										<input type="checkbox" onChange={(e) => this.setState({ SelectedPreferences: [...this.state.SelectedPreferences, key] })} />
										{" "}{key}
									</label>
								</div>
							)))}
						</div>
						<div align={"center"}>
							<button type="submit" > Filter </button>
						</div>
						<div style={{ height: 100 }}>

						</div>
					</form>
				</div>

				<div style={{ paddingRight: 10, float: 'right', width: '70%' }}>
					<center>
						<br />
						<h1>Task List</h1>
					</center>
					<Button type="button" onClick={this.reset} style={{ marginBottom: 10 }}>
						Show All Tasks
					</Button>
					<Container className="tasks-grid">
						{this.state.TaskInfo.map(task => (
							<div key={task.Task_ID} className="card">
								<div className="card-body">
									<h5 className="card-title">{task.Description}</h5>
									<h6 className="card-subtitle mb-2 text-muted">
										Date: {task.Date} Status: {task.Status}
									</h6>
									<p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
								</div>
								<TaskRequestVolunteer username={this.props.username} taskID={task.Task_ID} status={task.Status} />
							</div>
						))}</Container>
				</div>
			</div>
		)
	}

}

export default GeneralTasksBoardVolunteer;
