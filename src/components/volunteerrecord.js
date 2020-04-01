import React, { Component } from "react";



class VolunteerRecords extends Component {

	render () {
		console.log(this.props.records)
		return (
			<div>
				{this.props.records.map(record => (
					<div className="card">
						<div className="card-body">
							<div className="card-title">
							Task: {record.description}
							</div>
							<p className="card-text"> Senior Helped: {record.senior} </p>
							<p className="card-text"> Date: {record.date} Hours: {record.hours} </p>
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default VolunteerRecords;