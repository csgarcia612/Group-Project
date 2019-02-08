import React, { Component } from "react";
import axios from "axios";
import "./home.scss";
import { connect } from "react-redux";
import { setEvents, setCity } from "../../dux/reducer";
import { NavLink } from "react-router-dom";

class home extends Component {
	constructor() {
		super();
		this.state = {
			locations: [],
			searchQuery: "",
			filteredLocations: []
		};
	}

	componentDidMount() {
		this.getCities();
	}

	getCities = () => {
		axios
			.get(
				"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
			)
			.then(locations => {
				this.setState({
					locations: locations.data
				});
			});
	};

	handleSearch = e => {
		this.setState({
			searchQuery: e.target.value
		});
		this.displayFilteredCities(e.target.value);
	};

	displayFilteredCities = userInput => {
		let { locations } = this.state;
		let filteredLocations;
		let searchFilter = new RegExp(userInput, "gi");
		filteredLocations = locations.filter(e => {
			return e.city.match(searchFilter) || e.state.match(searchFilter);
		});
		this.setState({
			filteredLocations
		});
	};

	searchEvents = e => {
		let baseSearch = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3&radius=50&sort=date,asc&classificationName=[music]&unit=miles`;
		let customSearch = baseSearch + "&city=" + e.city;
		this.props.setCity(e.city);
		axios.get(customSearch).then(response => {
			console.log(
				"response.data in home before setting redux state",
				response.data
			);
			this.props.setEvents(response.data);
		});
	};

	getHighlightedText = (text, highlight) => {
		// Split text on higlight term, include term itself into parts, ignore case
		var parts = text.split(new RegExp(`(${highlight})`, "gi"));
		return (
			<p>
				{parts.map(part =>
					part.toLowerCase() === highlight.toLowerCase() ? (
						<p className="search-match">{part}</p>
					) : (
						part
					)
				)}
			</p>
		);
	};

	render() {
		const { filteredLocations, locations, searchQuery } = this.state;
		const searchDropDown = filteredLocations.map(e => {
			return (
				<div key={e.rank} className="search-dropdown">
					<NavLink to="/search">
						<p onClick={() => this.searchEvents(e)}>
							{e.city}, {e.state}
						</p>
					</NavLink>
				</div>
			);
		});
		return (
			<div className="home-container">
				<img src="./images/music-tree5.png" />
				<div className='search-box'>
					<input
						className="home-search-input"
						onChange={e => this.handleSearch(e)}
						value={this.state.searchQuery}
					/>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
<path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
</svg>
				</div>
				<div className="dropdown-menu">
					{filteredLocations ? searchDropDown : null}
				</div>
			</div>
		);
	}
}

// const mapStateToProps = () => {
//   return {

//   }
// }
let _;
export default connect(
	_,
	{ setEvents, setCity }
)(home);
