import { Switch, Route } from 'react-router-dom';

import Home from "./components/home_page/home";
import SearchResultsPage from "./components/search_results_page/search_results";
import EventPage from "./components/event_details_page/event_details";
import UserProfile from "./components/user_profile_page/user_profile";
import About from "./components/about_page/about";

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/search' component={SearchResultsPage}/>
        <Route path='/event' component={EventPage}/>
        <Route path='/profile' component={UserProfile}/>
        <Route path='/about' component={About}/>
    </Switch>
)