import {mount} from "enzyme";
import {Map, List, Record} from "immutable";
import React from "react";
import configureStore from "redux-mock-store"
import {Provider} from "react-redux";
import {DELETE_ROUTE, SET_NEW_ROUTES_ORDER} from "../../constants";
import RoutesList from "./index";

describe('should render and be fully functional ', () => {
    const initialState = {
        routes: Record({
            loading: false,
            center: [55.75, 37.57],
            order: List(["_abc", "_bca"]),
            routes: Map([["_abc", {coords: [55.75, 37,57] ,name: "route1"}], ["_bca", "route2"]])
        })()
    };
    const middlewares = [];
    let mockStore = configureStore(middlewares);
    let store = mockStore(initialState);
    let component;
    const expectedActions = {
        deleteRoute: [{
            type: DELETE_ROUTE,
            payload: {id: "_bca"}
        }],
        setNewRoutesOrder: [{
            type: SET_NEW_ROUTES_ORDER,
            payload: ["_bca", "_abc"]
        }]
    }

    beforeEach(() => {
        component = mount(<Provider store={store}><RoutesList /></Provider>);
        store.clearActions();
    });

    it("should render and match snapshot", () => {
        expect(component).toMatchSnapshot();
    });

    it("should render 2 routes", () => {
        expect(component.find(".routes-list__element").length).toBe(2);
    })

    it("should dispatch DELETE_ROUTE on delete button click", () => {
        component.find(".routes-list__element").at(1).find("button").simulate("click");
        expect(store.getActions()).toEqual(expectedActions.deleteRoute);
    })
})