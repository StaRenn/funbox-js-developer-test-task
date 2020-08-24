import {mount} from "enzyme";
import {Map, List, Record} from "immutable";
import React from "react";
import configureStore from "redux-mock-store"
import SearchBar from "./index";
import {Provider} from "react-redux";
import {NEW_ROUTE} from "../../constants";

describe('should render and be fully functional ', () => {
    const initialState = {
        routes: Record({
            loading: false,
            center: [55.75, 37.57],
            order: List([]),
            routes: Map([])
        })()
    };
    const middlewares = [];
    let mockStore = configureStore(middlewares);
    let store = mockStore(initialState);
    let component;
    const expectedActions = {
        addNewRoute: [{
            type: NEW_ROUTE,
            payload: {name: "a", generateId: true}
        }]
    }

    beforeEach(() => {
        component = mount(<Provider store={store}><SearchBar /></Provider>);
        store.clearActions();
    });

    it('expect to match snapshot', () => {
        expect(component).toMatchSnapshot();
    })

    it("should dispatch addNewRoute with name `a` and reset searchQuery on enter key down", () => {
        component.find("input").simulate('change', {target: { value: 'a'}});
        expect(component.find("input").instance().value).toBe("a");
        component.find("input").simulate("keyDown", {key: "Enter"});
        expect(store.getActions()).toEqual(expectedActions.addNewRoute);
        expect(component.find("input").instance().value).toBe("");
    })

    it("should dispatch addNewRoute with name `a` and reset searchQuery on button click", () => {
        component.find("input").simulate('change', {target: { value: 'a'}});
        expect(component.find("input").instance().value).toBe("a");
        component.find("button").simulate("click");
        expect(store.getActions()).toEqual(expectedActions.addNewRoute);
    })

    it("should not dispatch if searchQuery is empty", () => {
        expect(component.find("input").instance().value).toBe("");
        component.find("button").simulate("click");
        expect(store.getActions().length).toBe(0);
    })
})