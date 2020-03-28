import React, { Component } from "react";
import Tasks from './tasks'
import {Modal, Button} from 'react-bootstrap';


class GeneralTasksBoard extends Component {
	constructor() {
		super()
		this.state = {
			TaskInfo: [],
// TODO populate with API calls
			City: ['Toronto', 'Vancouver', 'Calgary', 'Edmonton', 'Waterloo','Quebec', 'Burnaby', 'London'],
			Province: ['ON', 'BC', 'AB', 'QC'],
			Preferences: ['Outdoors', 'Indoors', 'Labour', 'Social', 'Behind the Scenes'],
			
			SelectedCities:[],
			SelectedProvinces:[],
			SelectedPreferences:[],

			show: false
		}
	}

	handleClose = () => {
		this.setState({show: false});
		console.log(this.state.show)
	}
  	
  	handleShow = () => {
  		this.setState({show: true});
  		console.log(this.state.show)
  	}

	componentDidMount() {
	 	console.log(this.props.username)
		fetch("http://localhost:8080/api/v1/task/")
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ TaskInfo: data });
		    })
		    .catch(console.log);
	}

	handleApi = (apiCall) => {
		if (this.state.SelectedCities.length !== 0)
		{
			this.state.SelectedCities.forEach(function(entry) {	
				apiCall = apiCall + "city=" + entry + "|"
			})
		}
		if (this.state.SelectedProvinces.length !== 0)
		{
			this.state.SelectedProvinces.forEach(function(entry) {	
				apiCall = apiCall + "prov=" + entry + "|"
			})
		}
		if (this.state.SelectedPreferences.length !== 0)
		{
			this.state.SelectedPreferences.forEach(function(entry) {	
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
		if(this.state.SelectedCities.length !== 0 || this.state.SelectedProvinces.length !== 0 || this.state.SelectedPreferences.length !== 0)
		{
		var apiCall = "http://localhost:8080/api/v1/task/filter/"
		apiCall = this.handleApi(apiCall);
		console.log(apiCall)
		fetch(apiCall)
		    .then(res => res.json())
		    .then(data => {
		       this.setState({ TaskInfo: data, SelectedCities:[], SelectedProvinces:[], SelectedPreferences:[]});
		    })
		    .catch(console.log);
		}
		document.querySelectorAll('input[type=checkbox]')
				.forEach( ele => ele.checked = false );
	}

	handleShow = () => {

	}


	render() {
	  	
		console.log(this.state.TaskInfo)	

	    return (
	    	<div>
	    		<form onSubmit={event => this.handleSubmit(event)}>
		    		<h3>filter</h3>
		    			<div>
		    			<h4> Cities: </h4>
		    			{this.state.City.map((key => (
		    				<div>
		    					<label> {key}:
		    						<input type="checkbox" onChange={(e) => this.setState({SelectedCities: [...this.state.SelectedCities, key]})} />
		    					</label>
						    </div>
						  )))}
		    			</div>
		    			<div>
		    			<h4> Province: </h4>
		    			{this.state.Province.map((key => (
		    				<div>
		    					<label> {key}:
		    						<input type="checkbox" onChange={(e) => this.setState({SelectedProvinces: [...this.state.SelectedProvinces, key]})} />
		    					</label>
						    </div>
						  )))}
		    			</div>
						<div>
						<h4> Preferences: </h4>
		    			{this.state.Preferences.map((key => (
		    				<div>
		    					<label> {key}:
		    						<input type="checkbox" onChange={(e) => this.setState({SelectedPreferences: [...this.state.SelectedPreferences, key]})} />
		    					</label>
						    </div>
						  )))}
		    			</div>
					<button type="submit"> Filter </button>
		    	</form>

		    	<button type="button" onClick={this.handleShow}>
        			Add Task
      			</button>
				
				<Modal show={this.state.show} onHide={this.handleClose}>
			        <Modal.Header closeButton>
			          <Modal.Title>Task Information</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={this.handleClose}>
			            Close
			          </Button>
			          <Button variant="primary" onClick={this.handleClose}>
			            Save Changes
			          </Button>
			        </Modal.Footer>
			    </Modal>
			<Tasks tasks={this.state.TaskInfo} />
		    </div>
	    )
	}

}

export default GeneralTasksBoard;