import React, { Component } from 'react';
import './order_confirmation.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../dux/reducer';
import StripeCheckout from 'react-stripe-checkout';

const dotenv = require('dotenv');
dotenv.config();

class OrderConfirmation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userEmail: '',
			ticketPrice: 0,
			ticketQuantity: 1
		};
		this.fillUserData = this.fillUserData.bind(this);
		this.increaseQuantity = this.increaseQuantity.bind(this);
		this.decreaseQuantity = this.decreaseQuantity.bind(this);
		this.receiptInputChange = this.receiptInputChange.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.fillUserData();
		}, 500);
	}

	// componentDidUpdate(prevProps) {
	// 	if (
	// 		this.props.user.first_name !== prevProps.user.first_name &&
	// 		this.props.purchaseInfo !== prevProps.purchaseInfo
	// 	) {
	// 		console.log('CDU FIRED');

	// 		this.fillUserData();
	// 	}
	// }

	fillUserData() {
		this.setState({
			userName: `${this.props.user.first_name} ${this.props.user.last_name}`,
			userEmail: `${this.props.user.email}`,
			ticketPrice: this.props.purchaseInfo.ticketPrice
		});
	}

	increaseQuantity() {
		let higherQuantity = this.state.ticketQuantity + 1;

		this.setState({
			ticketQuantity: higherQuantity
		});
	}

	decreaseQuantity() {
		let lowerQuantity = this.state.ticketQuantity - 1;

		this.setState({
			ticketQuantity: lowerQuantity
		});
	}

	receiptInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onToken = token => {
		console.log('stripe token:', token);

		const recipient = {
			auth0_id: this.props.user.auth0_id,
			name: this.state.userName,
			to: this.state.userEmail,
			subject: `Thank you ${
				this.state.userName
			} for your recent ticket purchase on Melo-Tree`
			// price: this.total(),
			// cart: this.props.cartProducts
		};

		const creditCharge = {
			token,
			state: this.state
		};
		// console.log("creditCharge", creditCharge);
		axios
			.post('/api/stripe', creditCharge)
			.then(res => {
				console.log('stripe response from server', res);
				axios.post('/api/nodemailer', recipient).then(res => {
					console.log('nodemailer response', res);
					return alert(
						'Payment successful! Check your email for order confirmation receipt'
					);
				});
				this.props.history.push('/');
			})
			.catch(error => {
				console.log('Error with front end credit processing', error);
			});
	};

	render() {
		console.log('Order Confirm Props:', this.props.purchaseInfo);
		// console.log('user-props', this.props.user);
		console.log('order-confirm-state', this.state);
		const { userName, userEmail, ticketPrice, ticketQuantity } = this.state;
		let totalPriceInPennies = ticketPrice * ticketQuantity * 100;

		return (
			<div className='order-confirmation-container'>
				{this.props.purchaseInfo && (
					<React.Fragment>
						<button onClick={() => this.props.closeModal()}>X</button>
						<div className='modal-event-venue-info'>
							<p>{`${this.props.purchaseInfo.event.name}`}</p>
							<p>{`${this.props.purchaseInfo.artist}`}</p>
							<p>{`${
								this.props.purchaseInfo.event._embedded.venues[0].name
							}`}</p>
							<p>{`${
								this.props.purchaseInfo.event._embedded.venues[0].city.name
							}, ${
								this.props.purchaseInfo.event._embedded.venues[0].state
									.stateCode
							}`}</p>
						</div>
						<div className='modal-event-time-date-info'>
							<p>{`${this.props.purchaseInfo.date}`}</p>
							<p>{`${this.props.purchaseInfo.time}`}</p>
						</div>
						<div className='modal-ticket-info'>
							<p>
								${`${this.props.purchaseInfo.ticketPrice}`}
								.00
							</p>
							<div className='modal-ticket-quantity-container'>
								<button
									className='quantity-buttons'
									disabled={ticketQuantity === 1 ? true : false}
									onClick={this.decreaseQuantity}
								>
									-
								</button>
								<p>{ticketQuantity}</p>
								<button
									className='quantity-buttons'
									disabled={ticketQuantity === 8 ? true : false}
									onClick={this.increaseQuantity}
								>
									+
								</button>
							</div>
						</div>
						<div className='modal-receipt-info'>
							<div className='receipt-info'>
								<p>Name:</p>
								<input
									className='modal-receipt-inputs'
									value={userName}
									onChange={this.receiptInputChange}
								/>
							</div>
							<div className='receipt-info'>
								<p>Email:</p>
								<input
									className='modal-receipt-inputs'
									value={userEmail}
									onChange={this.receiptInputChange}
								/>
							</div>
						</div>
						<div className='stripe-checkout-form'>
							<StripeCheckout
								name='Melo-Tree'
								description='Enjoy The Show'
								image='https://i.imgur.com/yykorWm.png'
								ComponentClass='div'
								panelLabel='Total: '
								amount={totalPriceInPennies}
								currency='USD'
								stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
								locale='auto'
								email={userEmail}
								zipCode={false}
								allowRememberMe={false}
								token={this.onToken}
								triggerEvent='onClick'
							>
								<button className='btn btn-primary'>
									Proceed To Payment Info
								</button>
							</StripeCheckout>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	setUser: setUser
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(OrderConfirmation)
);
