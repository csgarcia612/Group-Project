import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./event_details.scss";

class EventDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			singleEvent: null,
			ticketPrice: 0
		};
		this.getEvent = this.getEvent.bind(this);
		this.getPrice = this.getPrice.bind(this);
	}

	componentDidMount() {
		// console.log("props", this.props);
		this.getEvent();
		this.getPrice();
	}

	getEvent() {
		let eventID = this.props.match.params && this.props.match.params.id;
		// console.log("eventID", eventID);
		axios
			.get(
				`https://app.ticketmaster.com/discovery/v2/events/${eventID}.json?apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3`
			)
			.then(res => {
				console.log("res.data", res.data);
				this.setState({
					singleEvent: res.data
				});
			});
	}

	getPrice() {
		let randomPrice = Math.floor(Math.random() * (500 - 30) + 1);
		this.setState({
			ticketPrice: randomPrice
		});
	}

	render() {
		const { singleEvent, ticketPrice } = this.state;
		let splitEventName =
			singleEvent &&
			singleEvent.name.split(
				", "
				//  || "Plus" || "with Special Guest"
			);

		let mainArtistName =
			singleEvent &&
			(singleEvent && singleEvent._embedded.attractions
				? singleEvent && singleEvent._embedded.attractions[0].name
				: splitEventName[0]);

		let specialGuests =
			// singleEvent &&
			// singleEvent._embedded.attractions.length > 1 ?
			singleEvent &&
			(singleEvent._embedded.attractions &&
			singleEvent._embedded.attractions.length > 1
				? "WITH SPECIAL GUESTS"
				: null);

		let guestList =
			singleEvent &&
			singleEvent._embedded.attractions.map(artist => {
				// console.log("artist", artist);
				return (
					<p key={artist.id} className="guest-artist">
						{artist.name}
					</p>
				);
			});

		guestList && guestList.splice(0, 1);

		return (
			<div className="event-details-container">
				{console.log("singleEvent", singleEvent)}
				<div className="event-details-image-container">
					<img src={singleEvent && singleEvent.images[0].url} />
				</div>
				<div className="event-details-info-container">
					<div className="event-venue-info-container">
						<p className="event-name">{singleEvent && singleEvent.name}</p>
						<p className="venue-name">
							{singleEvent && singleEvent._embedded.venues[0].name}
						</p>
						<div className="venue-address-container">
							<p className="venue-street-address">
								{singleEvent && singleEvent._embedded.venues[0].address.line1}
							</p>
							<p className="venue-city-state-zip">
								{`${singleEvent &&
									singleEvent._embedded.venues[0].city.name}, ${singleEvent &&
									singleEvent._embedded.venues[0].state
										.stateCode} ${singleEvent &&
									singleEvent._embedded.venues[0].postalCode}`}
							</p>
						</div>
					</div>
					<div className="event-artist-info-container">
						<p className="artist-name">{mainArtistName}</p>
						<div
							className={
								singleEvent &&
								(singleEvent._embedded.attractions &&
									singleEvent._embedded.attractions.length > 1)
									? "show-special-guests"
									: "hide-special-guests"
							}
						>
							<p>{specialGuests}</p>
							{guestList}
						</div>
					</div>
				</div>
				<div className="event-purchase-container">
					<p>${ticketPrice}.00</p>
				</div>
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
