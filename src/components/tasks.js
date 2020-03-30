import React from "react";

const Tasks = ({ tasks }) => {
  console.log(tasks)
  return (
    <div>
      {tasks.map(task => (
        <div key={task.Task_ID} className="card">
          <div className="card-body">
            <h5 className="card-title">{task.Description}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Date: {task.Date} Status: {task.Status}
            </h6>
            <p className="card-text">{task.Address} {task.City} {task.Province} {task.PostalCode}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
