import {DELETE_ROUTE, NEW_ROUTE, SET_NEW_ROUTES_ORDER} from "../constants";
import {Map, List} from "immutable";

const UserState = {
    total: 0,
    order: List([]),
    routes: Map({})
};

const defaultState = UserState;

export default (userState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case NEW_ROUTE: {
            return {
                routes: userState.routes.set(payload.id, payload.location),
                order: userState.order.push(payload.id),
                total: userState.total + 1,
            }
        }
        case SET_NEW_ROUTES_ORDER: {
            return {...userState, order: List(payload.order)}
        }
        case DELETE_ROUTE: {
            return {...userState, routes: userState.routes.remove(payload.id), order: userState.order.delete(userState.order.indexOf(payload.id))}
        }
    }

    return userState
}