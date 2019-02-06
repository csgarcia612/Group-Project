const INITIAL_STATE = {
	user: null,
	events: []
};

const SET_USER = "SET_USER";
const SET_EVENTS = "SET_EVENTS";

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_USER:
			return Object.assign({}, state, { user: action.payload });

		case SET_EVENTS:
			return Object.assign({}, state, { events: action.payload });

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
	console.log("setEvents in reducer", events._embedded.events);
	return {
		type: SET_EVENTS,
		payload: events
	};
}
