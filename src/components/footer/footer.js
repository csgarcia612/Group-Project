import React, { Component } from "react";
import "./footer.scss";

class Footer extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="footer-container">
				<div className="footer-name-logo container">
					<div className="footer-name-container">
						<p className="footer-name">WEBSITE NAME</p>
						<p>&reg;</p>
					</div>
				</div>
				<div className="social-icons-container">
					<a href="https://www.facebook.com/">
						<img className="social-media-icon" src="./images/facebook.png" />
					</a>
					<a href="https://twitter.com/">
						<img className="social-media-icon" src="./images/twitter.png" />
					</a>
					<a href="https://www.instagram.com/">
						<img className="social-media-icon" src="./images/instagram.png" />
					</a>
					<a href="https://www.youtube.com/">
						<img className="social-media-icon" src="./images/youtube.png" />
					</a>
				</div>
			</div>
		);
	}
}

export default Footer;
