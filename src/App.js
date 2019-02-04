import React, { Component } from "react";
import "./App.scss";
import {Switch, NavLink, Route} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "./components/home_page/home";
import Event from "./components/event_details_page/event_details";
import About from "./components/about_page/about";
import UserProfile from "./components/user_profile_page/user_profile";
// import {setUser} from 
import routes from './routes';


class App extends Component {

  componentDidMount() {
    //*** GET USER DATA HERE!!! ***
  }

	render() {
		return (
      <div className="App">
        <div className="headerContainer">
          <Header />
        </div>
        <div className="displayedPageContainer">
          {routes}
        </div>
        <div className="footerContainer">
          <Footer />
        </div>
      </div>
    )
	}
}

export default App;
