import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
import CardSection from './CardSection';

const dotenv = require('dotenv');
dotenv.config();

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = { complete: false };
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		// console.log('Props.user in submit', this.props.user);
		// console.log('Props in submit', this.props);

		let userName = this.props.userName;

		let totalPrice =
			this.props && this.props.ticketPrice * this.props.ticketQuantity;

		let { token } = await this.props.stripe.createToken({ name: userName });

		let response = await fetch('/api/charge', {
			method: 'POST',
			headers: { Authorization: 'sk_test_f5e5mMeqmEQ0ZvUy3HMsi9j6' },
			body: {
				stripeToken: token && token.id,
				totalPrice
			}
		});

		if (response.ok) {
			console.log('Purchase Complete!');
			return this.setState({
				complete: true
			});
		} else {
			return error => console.log('Error occurred during purchase', error);
		}
	}

	render() {
		if (this.state.complete) {
			return <h1>Purchase Complete</h1>;
		}
		return (
			<div className='checkout'>
				{/* {console.log('this.props.user', this.props.user)} */}
				<CardSection />
				<button onClick={this.submit}>Proceed</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
