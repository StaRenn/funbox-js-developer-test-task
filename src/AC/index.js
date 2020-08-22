import {API_KEY, DELETE_ROUTE, NEW_ROUTE, REPLACE_ROUTE, SET_NEW_ROUTES_ORDER, START, SUCCESS} from "../constants"

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
                }
            })
    })
}

export const replaceRoute = (id, coordinates) => {
    return(dispatch => {
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${coordinates.reverse().join(",")}`)
            .then(response => response.json())
            .then(({response}) => {
                if(response && response.GeoObjectCollection && response.GeoObjectCollection.featureMember.length !== 0){
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
                }
            })
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