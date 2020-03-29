import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import "../index.css";

const NavbarSS = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand> seniorServe</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-left" navbar>
            <NavItem>
              <Link to="/mainlanding">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/taskboard">TaskBoard</Link>
            </NavItem>
            <NavItem>
              <Link to="/records"> Volunteer Records</Link>
            </NavItem>
            <NavItem>
              <Link to="/reviews"> Reviews</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                className="nav-link active"
                className="userProfile"
                to="/userprofile"
              >
                User Profile
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link active" className="logout" href="/">
                logout
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarSS;
