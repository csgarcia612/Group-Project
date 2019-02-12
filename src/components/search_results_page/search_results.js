import React, { Component } from 'react';
import { connect } from 'react-redux';
import './search_results.scss';
// import { filter } from "graphql-anywhere";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { setEvents, setCity } from '../../dux/reducer';
import SingleResult from '../single_search_result/single_result';

class search_results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			city: this.props.city,
			startDateTime: null,
			endDateTime: null,
			radius: 50,
			genreId:
				'KnvZfZ7vAvv,KnvZfZ7vAve,KnvZfZ7vAvd,KnvZfZ7vAvA,KnvZfZ7vAvk,KnvZfZ7vAeJ,KnvZfZ7vAv6,KnvZfZ7vAvF,KnvZfZ7vAva,KnvZfZ7vAv1,KnvZfZ7vAvJ,KnvZfZ7vAvE,KnvZfZ7vAvI,KnvZfZ7vAvt,KnvZfZ7vAvn,KnvZfZ7vAvl,KnvZfZ7vAev,KnvZfZ7vAee,KnvZfZ7vAed,KnvZfZ7vAe7,KnvZfZ7vAeA,KnvZfZ7vAeF'
		};
	}

	handleUserInput = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		// console.log(e.target.value);
	};

	handleSearch = () => {
		let searchQuery = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3&classificationName=[music]&size=20&sort=date,asc`;
		let filterCriteria = {};
		for (let key in this.state) {
			// console.log("each key in state", key);
			// console.log("each value of state key", this.state[key]);
			if (this.state[key]) {
				searchQuery += `&${key}=${this.state[key]}`;
				if (
					key === 'startDateTime' ||
					(key === 'endDateTime' && this.state[key])
				) {
					searchQuery += 'T00:00:00Z';
				}
			}
			// console.log(searchQuery);
		}
		// console.log(searchQuery);
		axios
			.get(searchQuery)
			.then(response => {
				// console.log("response.data in searchquery response", response.data);
				if (response.data.page.totalElements === 0) {
					this.props.setEvents(null);
				} else {
					this.props.setEvents(response.data);
					this.state.city && this.props.setCity(this.state.city);
				}
			})
			.catch(error => {
				console.log('---error in search', error);
			});
	};

	render() {
		// const date = new Date();

		console.log('date', Date.now());
		const initialState = {
			city: this.props.city,
			startDateTime: null,
			endDateTime: null,
			radius: 50,
			genreId:
				'KnvZfZ7vAvv,KnvZfZ7vAve,KnvZfZ7vAvd,KnvZfZ7vAvA,KnvZfZ7vAvk,KnvZfZ7vAeJ,KnvZfZ7vAv6,KnvZfZ7vAvF,KnvZfZ7vAva,KnvZfZ7vAv1,KnvZfZ7vAvJ,KnvZfZ7vAvE,KnvZfZ7vAvI,KnvZfZ7vAvt,KnvZfZ7vAvn,KnvZfZ7vAvl,KnvZfZ7vAev,KnvZfZ7vAee,KnvZfZ7vAed,KnvZfZ7vAe7,KnvZfZ7vAeA,KnvZfZ7vAeF'
		};
		console.log('this.props on search results', this.props);
		const eventsList =
			this.props.events &&
			this.props.events._embedded.events.map(e => {
				// console.log("e", e);
				return (
					<NavLink
						to={`/event/${e.id}`}
						key={e.id}
						event={e}
						className='event-details-navlink'
					>
						<SingleResult event={e} />
					</NavLink>
				);
			});
		// console.log("state", this.state);
		return (
			<div className='search-results-container'>
				<div className='filters'>
					<div className='filter-container'>
						<input
							type='text'
							className='input-field'
							name='city'
							value={this.state.city}
							onChange={e => this.handleUserInput(e)}
						/>
					</div>
					<div className='filter-container'>
						<h2>Start Date</h2>
						<input
							name='startDateTime'
							type='date'
							onChange={e => this.handleUserInput(e)}
						/>
					</div>
					<div className='filter-container'>
						<h2>End Date</h2>
						<input
							name='endDateTime'
							type='date'
							onChange={e => this.handleUserInput(e)}
						/>
					</div>
					<div className='filter-container'>
						<h2>Distance</h2>
						<input
							type='number'
							name='radius'
							min='10'
							max='100'
							step='10'
							value={this.state.radius}
							onChange={e => this.handleUserInput(e)}
						/>
					</div>
					<div className='filter-container'>
						<h2>Genre</h2>
						<select name='genreId' onChange={e => this.handleUserInput(e)}>
							<option value='KnvZfZ7vAvv,KnvZfZ7vAve,KnvZfZ7vAvd,KnvZfZ7vAvA,KnvZfZ7vAvk,KnvZfZ7vAeJ,KnvZfZ7vAv6,KnvZfZ7vAvF,KnvZfZ7vAva,KnvZfZ7vAv1,KnvZfZ7vAvJ,KnvZfZ7vAvE,KnvZfZ7vAvI,KnvZfZ7vAvt,KnvZfZ7vAvn,KnvZfZ7vAvl,KnvZfZ7vAev,KnvZfZ7vAee,KnvZfZ7vAed,KnvZfZ7vAe7,KnvZfZ7vAeA,KnvZfZ7vAeF'>
								All Genres
							</option>
							<option value='KnvZfZ7vAvv'>Alternative</option>
							<option value='KnvZfZ7vAve'>Romantic</option>
							<option value='KnvZfZ7vAvd'>Blues</option>
							<option value='KnvZfZ7vAvA'>Chanson</option>
							<option value='KnvZfZ7vAvk'>Children</option>
							<option value='KnvZfZ7vAeJ'>Classical</option>
							<option value='KnvZfZ7vAv6'>Country</option>
							<option value='KnvZfZ7vAvF'>EDM</option>
							<option value='KnvZfZ7vAva'>Folk</option>
							<option value='KnvZfZ7vAv1'>Hip Hop/Rap</option>
							<option value='KnvZfZ7vAvJ'>Holiday</option>
							<option value='KnvZfZ7vAvE'>Jazz</option>
							<option value='KnvZfZ7vAvI'>Medieval</option>
							<option value='KnvZfZ7vAvt'>Metal</option>
							<option value='KnvZfZ7vAvn'>New Age</option>
							<option value='KnvZfZ7vAev'>Pop</option>
							<option value='KnvZfZ7vAee'>R & B</option>
							<option value='KnvZfZ7vAed'>Reggae</option>
							<option value='KnvZfZ7vAe7'>Religious</option>
							<option value='KnvZfZ7vAeA'>Rock</option>
							<option value='KnvZfZ7vAeF'>World</option>
						</select>
					</div>
					<div className='filter-container'>
						<button onClick={() => this.setState({ ...initialState })}>
							Clear
						</button>
						<button onClick={this.handleSearch}>Search</button>
					</div>
				</div>
				<div className='events-list'>
					{eventsList ? eventsList : <h1>Search returned no results</h1>}
				</div>
				{/* <img className={this.state.loading ? 'loading' : 'loaded'} src='https://media.giphy.com/media/7FfMfPHQr9romeeKtk/giphy.gif' alt='loading'/> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.events,
		city: state.city
	};
};

export default connect(
	mapStateToProps,
	{ setEvents, setCity }
)(search_results);
