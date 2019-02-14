import React, { Component } from 'react';
import { GET_USER, DELETE_ADDRESS, NEW_ADDRESS } from './graphqlController';
import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { setUser } from '../../dux/reducer';

// class UserProfile extends Component {
// 	state = {
// 		users: [],
// 		editing: false,
// 		address_one: this.props.address_one,
// 		address_two: this.props.address_two,
// 		city: this.props.city,
// 		state: this.props.state,
// 		zipcode: this.props.zipcode
// 	};

class UserProfile extends Component {
	state = {
		users: [],
		addressProperties: [
			'address_one',
			'address_two',
			'city',
			'state',
			'zipcode'
		],
		editingState: false,
		address_one: '',
		address_two: '',
		city: '',
		state: '',
		zipcode: 0
	};

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// const userId = this.props.user && this.props.user.auth0_id;
	// console.log('userID', userId);

	render() {
		const { editingState } = this.state;
		let address_id;

		const userId = this.props.user && this.props.user.auth0_id;
		// console.log('userID', this.props.user);

		const getUser = auth0_id => (
			<Query query={GET_USER} variables={{ auth0_id }}>
				{({ loading, error, data }) => {
					if (loading) return <h1>Loading data...</h1>;
					if (error) return <h1>Error!</h1>;
					console.log('data', data);
					address_id = data.user.address ? +data.user.address.address_id : 0;
					return (
						<>
							<div className='user-image-container'>
								<img src={data.user.image_url} alt='User Imagery' />
							</div>
							<div className='user-info-container'>
								<p>{data.user.username}</p>
								<p>{data.user.first_name}</p>
								<p>{data.user.last_name}</p>
								<p>{data.user.email}</p>
								{data.user.address && (
									<>
										<p>{data.user.address.address_one}</p>
										<p>{data.user.address.address_two}</p>
										<p>{data.user.address.city}</p>
										<p>{data.user.address.state}</p>
										<p>{data.user.address.zipcode}</p>
									</>
								)}
							</div>
						</>
					);
				}}
			</Query>
		);

		return this.props.user ? (
			<div className='user-profile-container'>
				{getUser(userId)}
				<div className='address-info'>
					{editingState ? (
						<React.Fragment>
							<p>
								Address:{' '}
								<input
									type='text'
									name='address_one'
									value={this.state.address_one}
									onChange={e => this.handleInput(e)}
								/>
							</p>
							<p>
								Address:
								<input
									type='text'
									name='address_two'
									value={this.state.address_two}
									onChange={e => this.handleInput(e)}
								/>
							</p>
							<p>
								City:
								<input
									type='text'
									name='city'
									value={this.state.city}
									onChange={e => this.handleInput(e)}
								/>
							</p>
							<p>
								State:
								<input
									type='text'
									name='state'
									value={this.state.state}
									onChange={e => this.handleInput(e)}
								/>
							</p>
							<p>
								Zipcode:
								<input
									name='zipcode'
									value={this.state.zipcode}
									onChange={e => this.handleInput(e)}
								/>
							</p>
						</React.Fragment>
					) : (
						<React.Fragment />
					)}
				</div>
				{!editingState && (
					<React.Fragment>
						<button onClick={() => this.setState({ editingState: 'add' })}>
							Add Address
						</button>
					</React.Fragment>
				)}
				{editingState === 'add' && (
					<React.Fragment>
						<Mutation
							mutation={NEW_ADDRESS}
							refetchQueries={[{ query: GET_USER }]}
							onCompleted={() =>
								this.setState(
									{ editingState: false } & window.location.replace('/profile')
								)
							}
						>
							{(addAddress, { loading, error }) => (
								// console.log('data', data)
								<div>
									<button
										onClick={() => {
											addAddress({
												variables: {
													input: {
														user_id: this.props.user.user_id,
														address_one: this.state.address_one,
														address_two: this.state.address_two,
														city: this.state.city,
														state: this.state.state,
														zipcode: +this.state.zipcode
													}
												}
											});
										}}
									>
										Submit
									</button>
									{loading && <h1>Loading data...</h1>}
									{error && <h1>Error!</h1>}
								</div>
							)}
						</Mutation>
						<button onClick={() => this.setState({ editingState: false })}>
							Cancel
						</button>
					</React.Fragment>
				)}

				{!editingState && (
					<React.Fragment>
						<button onClick={() => this.setState({ editingState: 'edit' })}>
							Edit Address
						</button>
					</React.Fragment>
				)}
				{editingState === 'edit' && (
					<React.Fragment>
						<Mutation
							mutation={NEW_ADDRESS}
							refetchQueries={[{ query: GET_USER }]}
							onCompleted={() =>
								this.setState(
									{ editingState: false } & window.location.replace('/profile')
								)
							}
						>
							{(updateAddress, { loading, error }) => (
								<div>
									<button
										onClick={() => {
											updateAddress({
												variables: {
													input: {
														user_id: this.props.user.user_id,
														address_id: address_id,
														address_one: this.state.address_one,
														address_two: this.state.address_two,
														city: this.state.city,
														state: this.state.state,
														zipcode: +this.state.zipcode
													}
												}
											});
										}}
									>
										Submit
									</button>
									{loading && <h1>Loading data...</h1>}
									{error && <h1>Error!</h1>}
								</div>
							)}
						</Mutation>
						<button onClick={() => this.setState({ editingState: false })}>
							Cancel
						</button>

						<Mutation
							mutation={DELETE_ADDRESS}
							refetchQueries={[{ query: GET_USER }]}
							onCompleted={() =>
								this.setState(
									{ editingState: false } & window.location.replace('/profile')
								)
							}
						>
							{deleteAddress => (
								<button
									onClick={() => {
										deleteAddress({ variables: { address_id } });
									}}
								>
									Delete
								</button>
							)}
						</Mutation>
					</React.Fragment>
				)}
			</div>
		) : (
			<div>Please Login</div>
		);
	}
}
const mapStateToProp = state => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProp,
	{ setUser }
)(UserProfile);
