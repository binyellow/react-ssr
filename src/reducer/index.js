import { createStore, combineReducers, applyMiddleware } from "redux";
import { sessionReducer } from './login';

const reducer = combineReducers({
    loggedIn: sessionReducer,
});

export const createServerStore = (initialState) => createStore( reducer, initialState);
export const createClientStore = (initialState) => createStore( reducer, initialState, window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// export default ( initialState ) => createStore( reducer, initialState, window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
