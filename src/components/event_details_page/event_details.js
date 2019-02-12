import React, { Component } from 'react';
import './event_details.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../dux/reducer';
import OrderConfirmation from '../order_confirmation_modal/order_confirmation';

class EventDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			singleEvent: null,
			ticketPrice: 0,
			showModal: false
		};
		this.getEvent = this.getEvent.bind(this);
		this.getTime = this.getTime.bind(this);
		this.getDate = this.getDate.bind(this);
		this.getPrice = this.getPrice.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount() {
		// console.log("props", this.props);
		this.getEvent();
		this.getPrice();
		this.getTime();
		this.getDate();
	}

	getEvent() {
		let eventID = this.props.match.params && this.props.match.params.id;
		// console.log("eventID", eventID);
		axios
			.get(
				`https://app.ticketmaster.com/discovery/v2/events/${eventID}.json?apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3`
			)
			.then(res => {
				// console.log("res.data", res.data);
				this.setState({
					singleEvent: res.data
				});
			});
	}

	getTime() {
		const { singleEvent } = this.state;
		let splitTime = singleEvent && singleEvent.dates.start.localTime.split(':');

		let timeValue;

		let hours = Number(singleEvent && splitTime[0]);
		let minutes = Number(singleEvent && splitTime[1]);
		let seconds = Number(singleEvent && splitTime[2]);

		if (hours > 0 && hours <= 12) {
			timeValue = '' + hours;
		} else if (hours > 12) {
			timeValue = '' + (hours - 12);
		} else if (hours === 0) {
			timeValue = '12';
		}

		timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes;

		timeValue += seconds < 10 ? ':0' + seconds : ':' + seconds;

		timeValue += hours >= 12 ? ' P.M.' : ' A.M.';

		return timeValue;
	}

	getDate() {
		const { singleEvent } = this.state;

		let eventDate = new Date(
			`${singleEvent && singleEvent.dates.start.localDate}`
		);

		let options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		let fullDate = `${eventDate.toLocaleDateString('en-US', options)}`;

		return fullDate;
	}

	getPrice() {
		let randomPrice = Math.floor(Math.random() * (500 - 30) + 1);
		this.setState({
			ticketPrice: randomPrice
		});
	}

	toggleModal() {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	render() {
		const { singleEvent, ticketPrice } = this.state;
		let splitEventName =
			singleEvent &&
			singleEvent.name.split(
				', '
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
				? 'WITH SPECIAL GUEST(S)'
				: null);

		let guestList =
			singleEvent &&
			singleEvent._embedded.attractions.map(artist => {
				// console.log("artist", artist);
				return (
					<p key={artist.id} className='guest-artist'>
						{artist.name}
					</p>
				);
			});

		guestList && guestList.splice(0, 1);

		let highestWidthPicture =
			singleEvent &&
			Math.max.apply(
				Math,
				singleEvent.images.map(images => {
					// console.log("images.width", images.width);
					return images.width;
				})
			);

		let bestArtistPicture =
			singleEvent &&
			singleEvent.images.find(picture => {
				return picture.width === highestWidthPicture;
			});

		let purchaseProps = singleEvent && {
			event: singleEvent,
			artist: mainArtistName,
			ticketPrice: ticketPrice,
			date: this.getDate(),
			time: this.getTime()
		};

		return (
			<div className='event-details-page-container'>
				<div className={this.state.showModal ? 'show-modal' : 'hide-modal'}>
					{/* {console.log('singleEvent', singleEvent)} */}
					{/* {console.log("bestPicture", bestArtistPicture)} */}
					{/* {console.log('purchase props', purchaseProps)}; */}
					<OrderConfirmation
						closeModal={this.toggleModal}
						purchaseInfo={purchaseProps}
					/>
				</div>
				<div className='event-details-container'>
					<div className='event-details-image-container'>
						<img
							className='artist-picture'
							src={singleEvent && bestArtistPicture.url}
							alt='Single Event Imagery'
						/>
					</div>
					<p className='event-name'>{singleEvent && singleEvent.name}</p>
					<div className='event-details-info-container'>
						<div className='event-venue-info-container'>
							<div className='event-date-time-container'>
								<p className='event-date'>{this.getDate()}</p>
								<p className='event-time'>{this.getTime()}</p>
							</div>
							<p className='venue-name'>
								{singleEvent && singleEvent._embedded.venues[0].name}
							</p>
							<div className='venue-address-container'>
								<p className='venue-street-address'>
									{singleEvent && singleEvent._embedded.venues[0].address.line1}
								</p>
								<p className='venue-city-state-zip'>
									{`${singleEvent &&
										singleEvent._embedded.venues[0].city.name}, ${singleEvent &&
										singleEvent._embedded.venues[0].state
											.stateCode} ${singleEvent &&
										singleEvent._embedded.venues[0].postalCode}`}
								</p>
							</div>
						</div>
						<div className='event-artist-info-container'>
							<p className='starring'>STARRING</p>
							<p className='artist-name'>{mainArtistName}</p>
							<div
								className={
									singleEvent &&
									(singleEvent._embedded.attractions &&
										singleEvent._embedded.attractions.length > 1)
										? 'show-special-guests'
										: 'hide-special-guests'
								}
							>
								<p className='special-guest'>{specialGuests}</p>
								{guestList}
							</div>
						</div>
					</div>
					<div className='event-purchase-container'>
						<p className='ticket-price'>Price: ${ticketPrice}.00</p>
						<button onClick={this.toggleModal}>Purchase Tickets</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.events,
		user: state.user
	};
};

const mapDispatchToProps = {
	setUser: setUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventDetails);
