import React, { Component } from "react";
import { connect } from "react-redux";
import "./search_results.scss";
import SingleResult from "../single_search_result/single_result";

class search_results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: "&city=" + this.props.city,
			distance: "&radius=",
			genre: "&genre"
		};
	}

	handleUserInput = e => {
		console.log(e.target.value);
	};

	render() {
		const eventsList =
			this.props.events &&
			this.props.events._embedded.events.map(e => {
				return <SingleResult key={e.id} event={e} />;
			});
		return (
			<div className="search-results-container">
				<div className="filters">
					<input
						name="startDate"
						type="date"
						onChange={e => this.handleUserInput(e)}
					/>
					<input
						name="endDate"
						type="date"
						onChange={e => this.handleUserInput(e)}
					/>
					<input
						type="number"
						name="radius"
						min="10"
						max="100"
						step="10"
						placeholder="50"
						onChange={e => this.handleUserInput(e)}
					/>
					<select onChange={e => this.handleUserInput(e)}>
						<option value="genre1">Pop</option>
						<option value="genre2">Rock</option>
						<option value="genre3">Jazz</option>
						<option value="genre4">Blues</option>
					</select>
					<input type="number" onChange={e => this.handleUserInput(e)} />
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
