import React  from "react";


const VolunteerRecords = ({ records }) => {
	console.log(records)
	return (
		<div>
			{records.map(record => (
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

export default VolunteerRecords;