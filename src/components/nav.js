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
              <Link to="/taskboard">My Tasks</Link>
            </NavItem>
            <NavItem>
              <Link to="/records"> Volunteer Records</Link>
            </NavItem>
            <NavItem>
              <Link to="/reviews"> Reviews</Link>
            </NavItem>
            <NavItem>
             <Link to="/generalTasksBoard">All Tasks</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
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

// class NavbarSS extends Component {
//   render() {
//     return (
//       <div>
//         {/* {this.renderRedirect()} */}
//         <Navbar className="change" dark expand="md">
//           <NavbarBrand href="/home"> seniorServe</NavbarBrand>
//           {/* <NavbarToggler onClick={this.toggle} /> */}
//           <Collapse
//             /* isOpen={this.state.isOpen}  */

//             navbar
//           >
//             <Nav className="ml-left" navbar>
//               <NavItem>
//                 <NavLink href="/mainlanding"> Home</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/taskboard"> Taskboard</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/records"> Volunteer Records</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/reviews"> Reviews</NavLink>
//               </NavItem>
//             </Nav>
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink
//                   className="nav-link active"
//                   className="logout"
//                   href="/"
//                 >
//                   logout
//                 </NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>

//       //  render( props ) {
//       //   	console.log(this.props)
// //       //     return (
//           	<ul>
//           		<Link to="/mainlanding">
//           			<li>Home</li>
//           		</Link>
//       			<Link to="/taskboard">
//           			<li>Taskboard</li>
//           		</Link>
//           		<Link to="/records">
//           			<li>Volunteer Records</li>
//           		</Link>
//           		<Link to="/reviews">
//           			<li>Reviews</li>
//           		</Link>
//           	</ul>
//     );
//   }
// }

// export default NavbarSS;