import React, { Component } from "react";
import VolunteerRecord from "./volunteerrecord"
import axios from "axios";
import { Input} from "reactstrap";

class Records extends Component {

	constructor() {
		super()
		this.state = {
			volunteerHours: "", 
			volunteerRecord: [],
			selectionFeilds: ["date", "timeOfDay", "hours", "username","task_id", "seniorUsername", "taskDescription"],
			selectedSelectionProperty: [],
			filtered: false,
			filtereditems: [],
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
		console.log("reseting....")
		this.setState({	filtered: false, 
						filtereditems: [],
						selectedSelectionProperty: []
		})
	}

	handleSubmitProjection = () => {
		this.setState({	filtered: true })

		axios.get("http://localhost:8080/api/v1/volunteerRecord/records/username=" + this.props.username 
			+ "/" + this.formatProjections())
		     .then(result => {
		     	console.log("reset!")
		     	this.setState({ filtereditems: result.data });
		     })
		     .catch()

		document.querySelectorAll('input[type=checkbox]')
				.forEach( ele => ele.checked = false );
	}

	formatProjections = () => {
		let projectionUrl = ""
		
		this.state.selectedSelectionProperty.forEach(function(entry) {
				projectionUrl = projectionUrl + entry + "|"
			})

		return projectionUrl
	}

  	render() {

  		let recordStatus

  		console.log(this.state.filtereditems)

  		if (this.state.filtereditems.length === 0 && this.state.volunteerRecord.length === 0) {
  			recordStatus = (<h4> -- No Records To Be Displayed -- </h4>)
  		} else {
  			if (this.state.filtered) {
  				recordStatus = <VolunteerRecord records={this.state.filtereditems}/>
  			} else {
  				recordStatus = <VolunteerRecord records={this.state.volunteerRecord}/>
  			}
  		}


    	return (

    		<div style={{display: 'table', width: '90%'}}>
   
	    		<div align="left" style={{paddingLeft: '5%', paddingRight: 20, float: 'left', width: '30%', marginTop: '5%'}}>
			    		<div>
				    		<h3> Selection Property: </h3>
				    		{"   "}
				    		{this.state.selectionFeilds.map(key => (
										<div key={key} style={{position: "relative", left: "25px"}}>
											<div>
												<Input
													type="checkbox"
													name= {key}
													id= {key}
													onChange={(e) => this.setState({selectedSelectionProperty: [...this.state.selectedSelectionProperty, key]})}/>
											<label> {key} </label>
											</div>
										</div>
									))}
							<button onClick={event => this.handleSubmitProjection(event)}> Filter By Property </button>
						</div>
			    	<button style={{marginTop: 10}} type="button" onClick={e => this.handleReset()}> Reset </button>
			    </div>	
			    <div style={{paddingRight: 10, float: 'right', width: '70%'}}>
			    	<h1> Records Page </h1>
					<h4> Total Volunteer Hours: {this.state.volunteerHours}</h4>
	    			{recordStatus}
	    		</div>
    		</div>
    	)
  	}
}

export default Records;
