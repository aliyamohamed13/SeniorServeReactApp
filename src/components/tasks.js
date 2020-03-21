import React from "react";

const Tasks = ({ tasks }) => {
  console.log(tasks)
  return (
    <div>
      <center>
        <h1>Tasks List</h1>
      </center>
      {tasks.map(task => (
        <div key={task.Task_ID} className="card">
          <div className="card-body">
            <h5 className="card-title">{task.Description}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {task.Date} status: {task.Status}
            </h6>
            <p className="card-text">{task.Address} {task.PostalCode}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
