import {
    DELETE_ROUTE,
    NEW_ROUTE,
    REPLACE_ROUTE,
    SET_NEW_ROUTES_ORDER,
    YANDEX_MAP_LOADED, SET_MAP_CENTER
} from "../constants"

export const addNewRoute = (name) => {
    return({
        type: NEW_ROUTE,
        payload: {
            name,
            generateId: true
        }
    })
}
export const setMapCenter = (coordinates) => {
    return({
        type: SET_MAP_CENTER,
        payload: {coords: coordinates}
    })
}


export const replaceRoute = (id, coordinates) => {
    return({
        type: REPLACE_ROUTE,
        payload: {id, coords: coordinates}
    })
}

export const yandexMapsLoaded = () => {
    return({type: YANDEX_MAP_LOADED})
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