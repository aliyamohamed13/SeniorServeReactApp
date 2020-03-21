import React, { Component } from "react";
import Tasks from "./tasks";

class TasksBoard extends Component {

	constructor() {
		super()
		this.state = {
			userTaskInfo: []
		}
	}

 	componentDidMount() {
	    fetch("http://localhost:8080/api/v1/task/username=" + this.props.location.state.username)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({ userTaskInfo: data });
	      })
	      .catch(console.log);
  	}


	render() {
	  	
		console.log(this.state.userTaskInfo)	


	    return (
	    	<Tasks tasks={this.state.userTaskInfo} />
	    )
	}
}

export default TasksBoard;
