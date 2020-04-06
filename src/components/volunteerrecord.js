import React, { Component } from "react";
import {Container} from "reactstrap"



class VolunteerRecords extends Component {

	render () {
		console.log(this.props.records)
		return (
			<Container className="tasks-grid">
				{this.props.records.map(record => (
					<div key={record.record_ID} className="card">
						<div className="card-body">
							{record.description !== null ? <div className="card-title"> Task: {record.description} </div> : <div></div>}
							{record.task_id !== null ? <div className="card-title"> TaskID: {record.task_id} </div> : <div></div>}
							{record.timeOfDay !== null ? <div className="card-title"> Time Volunteered: {record.timeOfDay} </div> : <div></div>}
							{record.senior !== null ? <p className="card-text"> Senior Helped: {record.senior} </p> : <p></p>}
							{record.date !== null ?<p className="card-text"> Date: {record.date} </p> : <p></p>}
							{record.hours !== null ?<p className="card-text"> Hours: {record.hours} </p> : <p></p>}
						</div>
					</div>
				))}
			</Container>
		)
	}
}

export default VolunteerRecords;