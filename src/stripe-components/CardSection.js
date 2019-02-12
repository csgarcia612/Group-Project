import React from 'react';
import { CardElement } from 'react-stripe-elements';

class CardSection extends React.Component {
	render() {
		return (
			<label>
				Payment Details
				<CardElement
					style={{
						base: {
							color: '#32325d',
							fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
							fontSmoothing: 'antialiased',
							fontSize: '16px',
							'::placeholder': {
								color: '#aab7c4'
							}
						},
						invalid: {
							color: '#fa755a',
							iconColor: '#fa755a'
						}
					}}
				/>
			</label>
		);
	}
}

export default CardSection;
