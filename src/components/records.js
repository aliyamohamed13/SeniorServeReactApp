import React, { Component } from "react";
import VolunteerRecord from "./volunteerrecord"


class Records extends Component {

	constructor() {
		super()
		this.state = {
			volunteerHours: "", 
			volunteerRecord: []
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/volunteerRecord/totalHours/username=" + this.props.username)
	     	.then(res => res.json())
	     	.then(data => {
	        this.setState({ volunteerHours: data });
	      	})
	    fetch("http://localhost:8080/api/v1/volunteerRecord/records/username=" + this.props.username)
	     	.then(res => res.json())
	     	.then(data => {
	        this.setState({ volunteerRecord: data });
	      	})
	  
	}

  	render() {

  		let recordStatus

  		if (this.state.volunteerRecord.length === 0) {
  			recordStatus = (<h4> -- No Records To Be Displayed -- </h4>)
  		} else {
  			recordStatus = <VolunteerRecord records={this.state.volunteerRecord}/>
  		}

    	return (
    		<div>
	    		<h1> Records Page </h1>
	    		<h4> Total Volunteer Hours: {this.state.volunteerHours}</h4>
    			{recordStatus}
    		</div>
    	)
  	}
}

export default Records;