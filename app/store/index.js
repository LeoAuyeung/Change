import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import creditCard from "./utilities/creditCard";
import charities from "./utilities/charities";
const rootReducer = combineReducers({ creditCard, charities });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;
