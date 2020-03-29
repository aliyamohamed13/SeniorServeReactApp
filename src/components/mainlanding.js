import React, { Component } from "react";
import Nav from "./nav.js";
import Tasksboard from "./tasksboard.js";
import Welcome from "./welcome.js";
import Reviews from "./reviews.js";
import Records from "./records.js";
import GeneralTasksBoard from "./generaltasksboard";
import VolunteerLeaderBoard from "./volunteerleaderboard"
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
					<Nav username = {this.state.username} />
					<Switch>
						<Route path="/mainlanding" component={Welcome} />
			           	<Route path="/taskboard" render={() => <Tasksboard username = {this.state.username}/>} />
			           	<Route path="/records" render={() => <Records username = {this.state.username}/>} />
			           	<Route path="/reviews" render={() => <Reviews username = {this.state.username}/>} />
			           	<Route path="/generalTasksBoard" render={() => <GeneralTasksBoard username = {this.state.username}/>} />
			           	<Route path="/volunteerLeaderBoard" render={() => <VolunteerLeaderBoard username = {this.state.username}/>} />
		           	</Switch>
	        	</div>
	    	</Router>
    	)
  	}
}

export default Mainlanding;
