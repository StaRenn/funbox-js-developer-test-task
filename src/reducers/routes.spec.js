import {Map, List, Record} from "immutable";
import React from "react";
import reducer from "./routes"
import {NEW_ROUTE} from "../constants";
import {addNewRoute, deleteRoute, replaceRoute, setMapCenter, setNewRoutesOrder, yandexMapsLoaded} from "../AC";

describe('reducer unit test', () => {
    const initialState = Record({
        loading: true,
        center: [55.75, 37.57],
        order: List(["_abc", "_bca"]),
        routes: Map([
            ["_abc", {coords: [55.75, 37.57], name: "route1"}],
            ["_bca", {coords: [55.75, 37.57], name: "route1"}]
        ])
    })();

    it("should return new instance with added route on NEW_ROUTE action", () => {
        const expectedState = Record({
            loading: true,
            center: [55.75, 37.57],
            order: List(["_abc", "_bca", "id1"]),
            routes: Map([
                ["_abc", {coords: [55.75, 37.57], name: "route1"}],
                ["_bca", {coords: [55.75, 37.57], name: "route1"}],
                ["id1", {coords: [55.75, 37.57], name: "route1"}]
            ])
        })();

        expect(reducer(initialState, {type: NEW_ROUTE, payload: {id: "id1", name: "route1"}}).toJSON())
            .toEqual(expectedState.toJSON())
    })

    it("should return new instance with new order on SET_NEW_ORDER_ACTION", () => {
        const expectedState = Record({
            loading: true,
            center: [55.75, 37.57],
            order: List(["_bca", "_abc"]),
            routes: Map([
                ["_abc", {coords: [55.75, 37.57], name: "route1"}],
                ["_bca", {coords: [55.75, 37.57], name: "route1"}]
            ])
        })();

        expect(reducer(initialState, setNewRoutesOrder(["_bca", "_abc"])).toJSON()).toEqual(expectedState.toJSON());
    })

    it("should return new instance without deleted route on DELETE_ROUTE", () => {
        const expectedState = Record({
            loading: true,
            center: [55.75, 37.57],
            order: List(["_abc"]),
            routes: Map([
                ["_abc", {coords: [55.75, 37.57], name: "route1"}],
            ])
        })();

        expect(reducer(initialState, deleteRoute("_bca")).toJSON()).toEqual(expectedState.toJSON());
    })

    it("should return new instance with new route coords on REPLACE_ROUTE", () => {
        const expectedState = Record({
            loading: true,
            center: [55.75, 37.57],
            order: List(["_abc", "_bca"]),
            routes: Map([
                ["_abc", {coords: [60, 40], name: "route1"}],
                ["_bca", {coords: [55.75, 37.57], name: "route1"}]
            ])
        })();

        expect(reducer(initialState, replaceRoute("_abc", [60,40])).toJSON()).toEqual(expectedState.toJSON());
    })

    it("should return new instance with new map center on SET_MAP_CENTER", () => {
        const expectedState = Record({
            loading: true,
            center: [40,40],
            order: List(["_abc", "_bca"]),
            routes: Map([
                ["_abc", {coords: [55.75, 37.57], name: "route1"}],
                ["_bca", {coords: [55.75, 37.57], name: "route1"}]
            ])
        })();

        expect(reducer(initialState, setMapCenter([40,40])).toJSON()).toEqual(expectedState.toJSON());
    })

    it('should return new instance with loading status false on YANDEX_MAP_LOADED', () => {
        const expectedState = Record({
            loading: false,
            center: [55.75, 37.57],
            order: List(["_abc", "_bca"]),
            routes: Map([
                ["_abc", {coords: [55.75, 37.57], name: "route1"}],
                ["_bca", {coords: [55.75, 37.57], name: "route1"}]
            ])
        })();

        expect(reducer(initialState, yandexMapsLoaded()).toJSON()).toEqual(expectedState.toJSON())
    })
})