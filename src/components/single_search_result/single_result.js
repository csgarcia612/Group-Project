import React, { Component } from "react";

class Single_Result extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { event } = this.props;
		return (
			<div className="mini-event-container">
				<div className="mini-event-image-container">
					<img
						src={event && event.image[6].url}
						onError={e => {
							e.target.onerror = null;
							e.target.src = "../images/default_band_image.jpg";
						}}
						alt="Event Poster Graphic"
					/>
				</div>
				<div className="mini-event-info-container">
					<div className="mini-event-name-container">
						<p className="mini-event-name">{event.}</p>
					</div>
					<div className="mini-date-container" />
				</div>
			</div>
		);
	}
}

export default Single_Result;
