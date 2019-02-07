import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class EventDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			singleEvent: null
		};
		this.getEvent = this.getEvent.bind(this);
	}

	componentDidMount() {
		console.log("props", this.props);
		this.getEvent();
	}

	getEvent() {
		let eventID = this.props.match.params && this.props.match.params.id;
		// console.log("eventID", eventID);
		axios
			.get(
				`https://app.ticketmaster.com/discovery/v2/events/${eventID}.json?apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3`
			)
			.then(res => {
				console.log(res.data);
				this.setState({
					singleEvent: res.data
				});
			});
	}

	render() {
		let splitEventName =
			this.state.singleEvent &&
			this.state.singleEvent.name.split(
				", "
				//  || "Plus" || "with Special Guest"
			);
		let mainArtistName =
			this.state.singleEvent &&
			(this.state.singleEvent && this.state.singleEvent._embedded.attractions
				? this.state.singleEvent &&
				  this.state.singleEvent._embedded.attractions[0].name
				: splitEventName[0]);
		let specialGuests =
			// this.state.singleEvent &&
			// this.state.singleEvent._embedded.attractions.length > 1 ?
			this.state.singleEvent &&
			(this.state.singleEvent._embedded.attractions &&
			this.state.singleEvent._embedded.attractions.length > 1
				? "WITH SPECIAL GUESTS"
				: null);

		return (
			<div className="event-details-container">
				{console.log("event", this.state.singleEvent)}
				<div className="event-details-image-container">
					<img src={this.singleEvent && this.singleEvent.images[0].url} />
				</div>
				<div className="event-details-info-container">
					<div className="event-venue-info-container">
						<p className="event-name">
							{this.singleEvent && this.singleEvent.name}
						</p>
						<p className="venue-name">
							{this.singleEvent && this.singleEvent._embedded.venues[0].name}
						</p>
						<div className="venue-address-container">
							<p className="venue-street-address">
								{this.singleEvent &&
									this.singleEvent._embedded.venues[0].address.line1}
							</p>
							<p className="venue-city">
								{this.singleEvent &&
									this.singleEvent._embedded.venues[0].city.name}
							</p>
							<p className="venue-state">
								{this.singleEvent &&
									this.singleEvent._embedded.venues[0].state.stateCode}
							</p>
							<p className="venue-zipcode">
								{this.singleEvent &&
									this.singleEvent._embedded.venues[0].postalCode}
							</p>
						</div>
					</div>
					<div className="event-artist-info-container">
						<p className="artist-name">{mainArtistName}</p>
						<p>{specialGuests}</p>
					</div>
				</div>
				<div className="event-purchase-container" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.events
	};
};

export default connect(mapStateToProps)(EventDetails);
