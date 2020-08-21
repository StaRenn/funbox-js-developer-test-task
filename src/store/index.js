import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import reducer from '../reducers'
import logger from "../middlewares/logger";
import idGenerator from "../middlewares/idGenerator";

const enhancer = applyMiddleware(thunk, logger, idGenerator);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store