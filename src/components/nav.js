import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import "../index.css";

const NavbarSS = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="change" dark expand="md">
        <NavbarBrand>seniorServe  <img src="../../seniorServe_logo.png" alt="" style={{ maxHeight: "100%", height: "40px" }} /></NavbarBrand>
        <NavbarToggler className="toggle-nav" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-left" navbar>
            <NavItem>
              <Link to="/mainlanding">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/tasksboardVolunteer">TaskBoard</Link>
            </NavItem>
            <NavItem>
              <Link to="/records">Volunteer Record</Link>
            </NavItem>
            <NavItem>
              <Link to="/reviews">Reviews</Link>
            </NavItem>
            <NavItem>
              <Link to="/volunteerTasksBoard">Tasks</Link>
            </NavItem>
            <NavItem>
              <Link to="/volunteerLeaderBoard">Leaderboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/compareUsers">Compare Users</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                className="nav-link active"
                className="userProfile"
                to="/userprofile"
              >
                Edit Profile
              </Link>
            </NavItem>
            <NavItem>
              <a href="https://seniorserve-react.herokuapp.com/">logout</a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarSS;
