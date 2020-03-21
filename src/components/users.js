import React from "react";

const Users = ({ users }) => {
  return (
    <div>
      <center>
        <h1>User List</h1>
      </center>
      {users.map(user => (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{user.username}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {user.firstName} {user.lastName}
            </h6>
            <p className="card-text">{user.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
