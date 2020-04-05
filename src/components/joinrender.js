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
						<h5> User #1: {result.username1}, User #2: {result.username2} </h5>
						<h5> {result.attribute1} {this.props.joinSymbol} {result.attribute2} </h5>
					</div>
				))}
			</div>
		)
	}
}

export default JoinRender;