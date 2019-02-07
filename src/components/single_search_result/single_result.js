import React, { Component } from "react";
import "./single_result.scss";

class Single_Result extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { event } = this.props;
		let splitEventName = event.name.split(", ");
		let mainArtistName = event._embedded.attractions
			? event._embedded.attractions[0].name
			: splitEventName[0];
		let splitDate = event.dates.start.localDate.split("-");
		let monthAbrvs = [
			null,
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		return (
			<div className="mini-event-container">
				<div className="mini-event-image-container">
					<img
						className="mini-event-image"
						src={event && event.images[6].url}
						onError={e => {
							e.target.onerror = null;
							e.target.src = "../images/default_band_image.jpg";
						}}
						alt="Event Poster Graphic"
					/>
					<div className="mini-event-info-container">
						<div className="mini-event-name-container">
							<p className="mini-event-name">{mainArtistName}</p>
							<p className="mini-venue-name">
								{event._embedded.venues[0].name}
							</p>
						</div>
						<div className="mini-event-date-container">
							<p className="mini-date-month">
								{monthAbrvs[Number(splitDate[1])]}
							</p>
							<p className="mini-date-day">{Number(splitDate[2])}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Single_Result;
