import {shallow} from "enzyme";
import React from "react";
import MainPage from "./index";

it('expect to render MainPage', () => {
    expect(shallow(<MainPage/>)).toMatchSnapshot();
})