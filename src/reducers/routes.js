import {DELETE_ROUTE, NEW_ROUTE, REPLACE_ROUTE, SET_NEW_ROUTES_ORDER, START, SUCCESS} from "../constants";
import {Map, List, Record} from "immutable";

const UserState = Record({
    loading: false,
    center: [55.75, 37.57],
    total: 0,
    order: List([]),
    routes: Map({})
});

const defaultState = UserState();

export default (userState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case NEW_ROUTE + START: {
            return userState.set("loading", true)
        }
        case NEW_ROUTE + SUCCESS: {
            return userState.update("total", total => total + 1)
                .update("order", order => order.push(payload.id))
                .setIn(["routes", payload.id], {location: payload.location, latitude: payload.latitude})
                .set("loading", false)
                .set("center", payload.latitude)
        }
        case SET_NEW_ROUTES_ORDER: {
            return userState.set("order", List(payload.order))
        }
        case DELETE_ROUTE: {
            return userState.update("total", total => total - 1)
                .update("order", order => order.delete(order.indexOf(payload.id)))
                .deleteIn(["routes", payload.id])
        }
        case REPLACE_ROUTE + SUCCESS: {
            return userState.setIn(["routes", payload.id], {location: payload.location, latitude: payload.latitude})
        }
    }

    return userState
}