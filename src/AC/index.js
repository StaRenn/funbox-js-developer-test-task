import {
    API_KEY,
    DELETE_ROUTE, FAILED,
    NEW_ROUTE, REMOVE_ERROR,
    REPLACE_ROUTE,
    SET_NEW_ROUTES_ORDER,
    START,
    SUCCESS,
    YANDEX_MAP_LOADED
} from "../constants"

export const addNewRoute = (location) => {
    return(dispatch => {
        dispatch({
            type: NEW_ROUTE + START
        })
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${location}&results=1`)
            .then(response => response.json())
            .then(({response}) => {
                if(response && response.GeoObjectCollection && response.GeoObjectCollection.featureMember.length !== 0){
                    dispatch({
                        type: NEW_ROUTE + SUCCESS,
                        payload: {
                            generateId: true,
                            location: response
                                .GeoObjectCollection
                                .featureMember[0]
                                .GeoObject
                                .metaDataProperty
                                .GeocoderMetaData.text,
                            latitude: response
                                .GeoObjectCollection
                                .featureMember[0]
                                .GeoObject
                                .Point.pos.split(" ").map(el => Number(el)).reverse()
                        }
                    })
                }else{
                    dispatch({
                        type: NEW_ROUTE + FAILED,
                        payload: {error: "Not found"}
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: NEW_ROUTE + FAILED,
                    payload: {error: error}
                })
            })
    })
}

export const replaceRoute = (id, coordinates) => {
    return(dispatch => {
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${coordinates.reverse().join(",")}`)
            .then(response => response.json())
            .then(({response}) => { //if service works then it will always return valid object, if not, it will be caught, so we dont need FAILED here
                    dispatch({
                        type: REPLACE_ROUTE + SUCCESS,
                        payload: {
                            id: id,
                            location: response
                                .GeoObjectCollection
                                .featureMember[0]
                                .GeoObject
                                .metaDataProperty
                                .GeocoderMetaData.text,
                            latitude: coordinates.reverse()
                        }
                    })
            })
            .catch(error => {
                dispatch({
                    type: NEW_ROUTE + FAILED,
                    payload: {error: error}
                })
            })
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

export const removeError = () => {
    return({
        type: REMOVE_ERROR
    })
}