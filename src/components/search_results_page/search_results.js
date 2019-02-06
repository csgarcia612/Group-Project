import React, { Component } from "react";
import { connect } from "react-redux";

class search_results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: "&city=" + this.props.city,
			distance: "&radius=",
			genre: "&genre"
		};
	}
	render() {
		const eventsList =
			this.props.events &&
			this.props.events._embedded.events.map(e => {
				return <p key={e.id}>{e.name}</p>;
			});
		return (
			<div className="search-results-container">
				<div className="filters">
					<input type="date" />
					<input type="number" />
					<select>
						<option value="genre1">Pop</option>
						<option value="genre2">Rock</option>
						<option value="genre3">Jazz</option>
						<option value="genre4">Blues</option>
					</select>
					<input type="number" />
				</div>
				<div className="events-list">{eventsList}</div>
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

export default connect(mapStateToProps)(search_results);
