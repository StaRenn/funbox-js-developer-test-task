import {DELETE_ROUTE, NEW_ROUTE, SET_NEW_ROUTES_ORDER} from "../constants"

export const addNewRoute = (location) => {
    return({
        type: NEW_ROUTE,
        payload: {
            generateId: true,
            location: location,
        }
    })
}

export const setNewRoutesOrder = (routes) => {
    return({
        type: SET_NEW_ROUTES_ORDER,
        payload: {order: routes}
    })
}

export const deleteRoute = (id) => {
    return({
        type: DELETE_ROUTE,
        payload: {id}
    })
}