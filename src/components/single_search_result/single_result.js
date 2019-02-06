import React, { Component } from "react";

class Single_Result extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="mini-event-container">
				<div className="mini-event-image-container">
					<img src={this.props.event.image[6].url} alt="Event Poster Graphic" />
				</div>
				<div className="mini-event-info-container" />
			</div>
		);
	}
}

export default Single_Result;
