import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import {Container, Button} from "reactstrap"
import axios from "axios";
import {
  Form,
  FormGroup,
  Input
} from "reactstrap";



class MakeReview extends Component {

	constructor() {
		super()
		this.state = {
			showReview: false, 
		
			volunteers:[],

			selectedVolunteer: "",
			review: "",
			rating:"",
			taskID: "",
			
			defaultValue:"Please Select"
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/v1/user/volunteer")
	     	.then(res => res.json())
	     	.then(data => {
	        this.setState({ volunteers: data });
	      	})
	}

	handleClose = () => {
		this.setState({showReview: false})
	}

	handleAddReview = () => {
		var apiTaskPostUrl = "http://localhost:8080/api/v1/review/"
		var randomReviewID = Math.floor(Math.random() * 1000000000)
		axios.post(apiTaskPostUrl, {
				"reviewID": randomReviewID,
				"description": this.state.review,
				"rating": this.state.rating,
				"taskID":this.state.taskID,
				"volunteerUserName":this.state.selectedVolunteer
				})
				.then(response => {
					console.log(response);
					console.log(response.data);
					if (response.status === 200) {
					    if (response.data === "") {
					    	console.log("POST Successful");
					    } else {
					    alert("Invalid information, please check");
					    }
					} else {
					   	console.log("something went wrong");
					    alert("Something went wrong, please check the fields and try again");
					}})
				.catch(function(error) {
					alert("Something went wrong, please check the fields and try again");
				});
		this.handleClose()
	}

	render () {
		console.log(this.props.tasks)
		console.log(this.state.volunteers)
		return (
			<div>
				<Container className="tasks-grid">
					{this.props.tasks.map(task => (
						<div key={task.Task_ID} >
							<div className="card">
					        	<div className="card-body">
						            <h5 className="card-title">{task.Description}</h5>
						            <h6 className="card-subtitle mb-2 text-muted">
						              Date: {task.Date} Status: {task.Status}
						            </h6>
					            	<p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
					            	<Button type='button' onClick={(e) => this.setState({showReview: true, taskID: task.Task_ID})}>
									Make Review
									</Button>
					          	</div>
					        </div>
						</div>
					))}
				</Container>
				<div>
					<Modal show={this.state.showReview} onHide={this.handleClose}>
						<Modal.Header closeButton>
						  <Modal.Title>Review Information</Modal.Title>
						</Modal.Header>
						<p style={{paddingLeft: '5%', paddingTop: '5%'}}>Review For: {"   "}
							<select defaultValue={this.state.defaultValue}
							onChange={(e) => this.setState({ selectedVolunteer: e.target.value})}>
								<option key="default" disabled>Please Select</option>
							{this.state.volunteers.map(key => (
							   	<option key={key.username}>{key.username}</option>))}
							</select>
						</p>
						<Modal.Body>
						<Form>
							  <FormGroup style={{ marginBottom: "30px" }}>
								<Input
								  type="text"
								  name="rating"
								  id="rating"
								  placeholder="On A Scale of 1-10"
								  onChange={event =>
									this.setState({ rating: event.target.value })
								  }
								/>
							  </FormGroup>{" "}
							  <FormGroup style={{ marginBottom: "30px" }}>
								<Input
								  type="textArea"
								  name="Review"
								  id="Review"
								  placeholder="Review"
								  onChange={event =>
									this.setState({ review: event.target.value })
								  }
								/>
							  </FormGroup>
							</Form>
						</Modal.Body>
						<Modal.Footer>
						  <Button variant="secondary" onClick={this.handleClose}>
							Close
						  </Button>
						  <Button variant="primary" onClick={this.handleAddReview}>
							Create Review
						  </Button>
						</Modal.Footer>
					</Modal>

				</div>
			</div>
		)
	}
}

export default MakeReview;