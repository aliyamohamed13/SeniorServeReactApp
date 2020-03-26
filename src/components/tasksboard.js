import React, { Component } from "react";
import Tasks from "./tasks";
import Welcome from "./welcome.js";
import Login from "./login.js"


class TasksBoard extends Component {

	constructor() {
		super()
		this.state = {
			userTaskInfo: []
		}
	}

 	componentDidMount() {
 		console.log(this.props.username)
	    fetch("http://localhost:8080/api/v1/task/username=" + this.props.username)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({ userTaskInfo: data });
	      })
	      .catch(console.log);
  	}



	render() {
	  	
		console.log(this.state.userTaskInfo)	

	    return (
	    	<div>
		    	<Tasks tasks={this.state.userTaskInfo} />
		    </div>
	    )
	}
}

export default TasksBoard;
