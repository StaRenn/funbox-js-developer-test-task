import * as actions from "./index"
import {
    DELETE_ROUTE,
    NEW_ROUTE,
    REPLACE_ROUTE,
    SET_NEW_ROUTES_ORDER,
    YANDEX_MAP_LOADED, SET_MAP_CENTER
} from "../constants"

describe("all actions should be workable", () => {

    it("should create an action to add new route", () => {
        const name = "route 1";
        const expectedAction = {
            type: NEW_ROUTE,
            payload: {
                generateId: true,
                name
            }
        }
        expect(actions.addNewRoute(name)).toEqual(expectedAction);
    })

    it("should create an action to set map center", () => {
        const coordinates = [10, 10];
        const expectedAction = {
            type: SET_MAP_CENTER,
            payload: {coords: coordinates}
        }
        expect(actions.setMapCenter(coordinates)).toEqual(expectedAction);
    })

    it("should create an action to replace route", () => {
        const id = "_nfsd9af";
        const coordinates = [10,10];
        const expectedAction = {
            type: REPLACE_ROUTE,
            payload: {id, coords: coordinates}
        }
        expect(actions.replaceRoute(id, coordinates)).toEqual(expectedAction);
    })

    it("should create an action which tells that yandex maps are loaded", () => {
        const expectedAction = {
            type: YANDEX_MAP_LOADED
        }
        expect(actions.yandexMapsLoaded()).toEqual(expectedAction);
    })

    it("should create an action to set new routes order", () => {
        const order = ["1", "2", "3"];
        const expectedAction = {
            type: SET_NEW_ROUTES_ORDER,
            payload: {order}
        }
        expect(actions.setNewRoutesOrder(order)).toEqual(expectedAction);
    })

    it("should create an action to delete route", () => {
        const id = "_nfsd9af";
        const expectedAction = {
            type: DELETE_ROUTE,
            payload: {id}
        }
        expect(actions.deleteRoute(id)).toEqual(expectedAction);
    })
})