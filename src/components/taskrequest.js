import React, { Component } from "react";
import NoTasksToDisplay from './notaskstodisplay';
import AcceptTaskRequest from './accepttaskrequest'
import { Container, Button } from "reactstrap"


class TaskRequest extends Component {

	constructor() {
		super()
		this.state = {
			userTaskInfo: []
		}
	}

	componentDidMount() {
		console.log(this.props)
		fetch("https://seniorserve-spring-postgres.herokuapp.com/api/v1/task/incompleteTasks/username=" + this.props.username)
			.then(res => res.json())
			.then(data => {
				this.setState({ userTaskInfo: data });
			})
	}

	render() {
		let pendingTasksReq

		if (this.state.userTaskInfo.length === 0) {
			pendingTasksReq = <NoTasksToDisplay />
		} else {
			pendingTasksReq = (
				<Container>
					{this.state.userTaskInfo.map(task => (
						<div key={task.Task_ID} className="card">
							<div className="card-body">
								<h5 className="card-title">{task.Description}</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									Date: {task.Date}  Status: {task.Status}
								</h6>
								<p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
								<AcceptTaskRequest taskID={task.Task_ID} username={this.props.username} />
							</div>
						</div>
					))}
				</Container>
			)
		}


		return (
			<div>
				<center>
					<br />
					<h1>My Pending Task Request For Approval</h1>
				</center>
				<div>
					{pendingTasksReq}
				</div>
			</div>
		)

	}

}

export default TaskRequest;