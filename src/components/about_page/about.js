import React, { Component } from 'react';

export default class About extends Component {
	render() {
		return (
			<div className="parent-div">
				<h1>Group about page</h1>
				<div className="contributer-profile">
					<h2>Contributer</h2>
					<div className="contributer-div">
						<div className="contributer-image">
							<img
								src="https://avatars0.githubusercontent.com/u/44471899?s=460&v=4"
								alt="Contributor Imagery"
							/>
						</div>
						<div className="contributer-info">
							<p>Name: Christ Garcia </p>
							<p>State: got no clue</p>
							<p>Email: not sure</p>
							<p>Link: i dont know</p>
							<p>Techicon: </p>
						</div>
					</div>

					<div className="contributer-div">
						<div className="contributer-image">
							<img
								src="https://ca.slack-edge.com/T039C2PUY-UBQ0SK7UH-0716cbb972cc-72"
								alt="Contributor Imagery"
							/>
						</div>
						<div className="contributer-info">
							<p>Name: Kyle Boysen </p>
							<p>State: Arizona</p>
							<p>Email: not sure</p>
							<p>Link: i dont know</p>
							<p>Techicon: </p>
						</div>
					</div>

					<div className="contributer-div">
						<div className="contributer-image">
							<img
								src="https://slack-imgs.com/?c=1&o1=gu&url=https%3A%2F%2Femoji.slack-edge.com%2FT039C2PUY%2Fcarlton%2Fbad2b236e747d486.gif"
								alt="Contributor Imagery"
							/>
						</div>
						<div className="contributer-info">
							<p>Name: Kyle Boysen </p>
							<p>State: Arizona</p>
							<p>Email: lavitz10@gmail.com</p>
							<p>Link: i dont know</p>
							<p>Techicon: </p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
