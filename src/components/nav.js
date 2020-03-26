import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Nav extends Component {
	 render( props ) {
	  	console.log(this.props)
	    return (
	    	<ul>
	    		<Link to="/mainlanding">
	    			<li>Home</li>
	    		</Link>
				<Link to="/taskboard">
	    			<li>Taskboard</li>
	    		</Link>
	    		<Link to="/records">
	    			<li>Volunteer Records</li>
	    		</Link>
	    		<Link to="/reviews">
	    			<li>Reviews</li>
	    		</Link>
	    	</ul>
	    )
  }
}

export default Nav;