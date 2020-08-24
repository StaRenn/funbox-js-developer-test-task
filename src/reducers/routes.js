import {
    DELETE_ROUTE,
    NEW_ROUTE,
    REPLACE_ROUTE,
    SET_NEW_ROUTES_ORDER,
    YANDEX_MAP_LOADED, SET_MAP_CENTER
} from "../constants";
import {Map, List, Record} from "immutable";

const UserState = Record({
    loading: true,
    center: [55.75, 37.57],
    order: List([]),
    routes: Map([])
});

const defaultState = UserState();

export default (userState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case NEW_ROUTE: {
            return userState.update("order", order => order.push(payload.id))
                .setIn(["routes", payload.id], {name: payload.name, coords: userState.get("center")})
        }
        case SET_NEW_ROUTES_ORDER: {
            return userState.set("order", List(payload.order))
        }
        case DELETE_ROUTE: {
            return userState.update("order", order => order.delete(order.indexOf(payload.id)))
                .deleteIn(["routes", payload.id])
        }
        case REPLACE_ROUTE: {
            return userState.updateIn(["routes", payload.id], route => {
                return {name: route.name, coords: payload.coords}
            })
        }
        case SET_MAP_CENTER: {
            return userState.set("center", payload.coords)
        }
        case YANDEX_MAP_LOADED:{
            return userState.set("loading", false)
        }
    }
    return userState
}