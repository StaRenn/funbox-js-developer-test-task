import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducers'
import idGenerator from "../middlewares/idGenerator";

const enhancer = applyMiddleware(idGenerator);

const store = createStore(reducer, {}, enhancer);

export default store