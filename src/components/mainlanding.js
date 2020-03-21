import React, { Component } from "react";
import Nav from "./nav.js";
import Tasksboard from "./tasksboard.js";
import Welcome from "./welcome.js";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class Mainlanding extends Component {
	constructor() {
		super();
		this.state = {
			username: ""
		}
	}

	componentDidMount() {
		this.setState({username : this.props.location.state.username})	
	}

  	render() {
 
 		console.log(this.state.username)
    	return (
	    	<Router>
	    		<div>
					<Nav />
					<Welcome />
		           	<Route path="/mainlanding" component={Tasksboard} />
	        	</div>
	    	</Router>
    	)
  	}
}

export default Mainlanding;
