import React, { Component } from "react";
import NoTasksToDisplay from './notaskstodisplay';
import Tasks from './tasks'


class TasksBoardVolunteer extends Component {
	constructor() {
		super()
		this.state = {
			requestedTasks: [],
			acceptedTasks: []
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/taskrequest/allTask/username=" + this.props.username)
	     	.then(res => res.json())
	     	.then(data => {
	        this.setState({ requestedTasks: data });
	      	})
	    fetch("http://localhost:8080/api/v1/volunteer/acceptedTasks/username=" + this.props.username)
	    	.then(res => res.json())
	      	.then(data => {
	        this.setState({ acceptedTasks: data });
	    	})
	}


	render() {

		let requestedTasksStatus
		let acceptedTasksStatus

		if (this.state.requestedTasks.length === 0)
		{
			requestedTasksStatus = <NoTasksToDisplay />
		} else {
			requestedTasksStatus = <Tasks tasks={this.state.requestedTasks}/>
		}

		if (this.state.acceptedTasks.length === 0)
		{
			acceptedTasksStatus = <NoTasksToDisplay />
		} else {
			acceptedTasksStatus = <Tasks tasks={this.state.acceptedTasks}/>
		}

		return (
			<div>
				<br/>
				<h1> My Requested Tasks </h1>
					{requestedTasksStatus}
					<br/>
				<h1> Accepted Tasks </h1>
					{acceptedTasksStatus}
			</div>
		)
	}


}

export default TasksBoardVolunteer;
