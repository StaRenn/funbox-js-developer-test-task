import React from 'react';
import store from "../store";
import {Provider} from "react-redux";
import MainPage from "../pages/MainPage";

function App() {
    return (
        <Provider store={store}>
            <MainPage/>
        </Provider>
    );
}

export default App;