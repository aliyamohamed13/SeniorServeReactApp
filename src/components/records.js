import React, { Component } from "react";
import VolunteerRecord from "./volunteerrecord"
import axios from "axios";

class Records extends Component {

	constructor() {
		super()
		this.state = {
			volunteerHours: "", 
			volunteerRecord: [],
			selectionFeilds: ["date", "description", "hours", "senior"],
			selectedSelectionProperty: "",
			filtered: false,
			filtereditems: []
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

	handleReset = () => {
		this.setState({	filtered: false, 
						filtereditems: [],
						selectedSelectionProperty: ""
		})
	}

	handleSubmitProjection = () => {
		this.setState({	filtered: true })
		axios.get("http://localhost:8080/api/v1/volunteerRecord/records/username=" + this.props.username 
			+ "/projection=" + this.state.selectedSelectionProperty)
		     .then(result => {
		     	console.log("reset!")
		     	this.setState({ filtereditems: result.data });
		     })
		     .catch()
	}

  	render() {

  		let recordStatus

  		if (this.state.filtereditems.length === 0 && this.state.volunteerRecord.length === 0) {
  			recordStatus = (<h4> -- No Records To Be Displayed -- </h4>)
  		} else {
  			if (this.state.filtered) {
  				recordStatus = (<div> {this.state.filtereditems.map(property => (<div key={property} className="card-body"> {property} </div>))} </div>)
  			} else {
  				recordStatus = <VolunteerRecord records={this.state.volunteerRecord}/>
  			}
  		}


    	return (
    		<div>
	    		<h1> Records Page </h1>
	    		<h4> Total Volunteer Hours: {this.state.volunteerHours}</h4>
		    		<div>
			    		<label> Selection Property: </label>
			    		{"   "}
						<select onChange={(e) => this.setState({ selectedSelectionProperty: e.target.value})} key={'SelectionProperty'}>
							{this.state.selectionFeilds.map(key => (
							   	<option key={key}>{key}</option>))}
						</select>
						{"   "}
						<button onClick={event => this.handleSubmitProjection(event)}> Filter By Property </button>
					</div>
		    	<button type="button" onClick={this.handleReset}> Reset </button>
    			{recordStatus}
    		</div>
    	)
  	}
}

export default Records;
