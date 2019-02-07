const INITIAL_STATE = {
	user: null,
	events: null,
	city: null
};

const SET_USER = "SET_USER";
const SET_EVENTS = "SET_EVENTS";
const SET_CITY = "SET_CITY";

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_USER:
			return Object.assign({}, state, { user: action.payload });

		case SET_EVENTS:
			return Object.assign({}, state, { events: action.payload });

		case SET_CITY:
			return Object.assign({}, state, { city: action.payload });

		default:
			return state;
	}
}

export function setUser(user) {
	console.log("setUser in reducer", user);
	return {
		type: SET_USER,
		payload: user
	};
}

export function setEvents(events) {
	console.log("setEvents in reducer", events);
	return {
		type: SET_EVENTS,
		payload: events
	};
}

export function setCity(city) {
	console.log("setCity in reducer", city);
	return {
		type: SET_CITY,
		payload: city
	};
}
