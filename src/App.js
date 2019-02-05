import React, { Component } from "react";
import "./App.scss";
import routes from "./routes";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div className="App">
				<Header />
				{routes}
				<Footer />
			</div>
		);
	}
}

export default App;
