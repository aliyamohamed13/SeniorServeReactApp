import React, { Component } from "react";


class JoinRender extends Component {
	constructor() {
		super()
	}


	render() {
		console.log(this.props)
		return(
			<div>
				<h3> Comparing Attribute: {this.props.joinAttribute} </h3>
				{this.props.joinResult.map(result => (
					<div key={result.username1 + result.attribute1 + result.username2 + result.attribute2}>
						<h4> User1: {result.username1}, User2: {result.username2} </h4>
						<h4> {result.attribute1} {this.props.joinSymbol} {result.attribute2} </h4>
					</div>
				))}
			</div>
		)
	}
}

export default JoinRender;