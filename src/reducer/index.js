import { createStore, combineReducers } from "redux";
import { sessionReducer } from './login';

const reducer = combineReducers( {
    loggedIn: sessionReducer,
} );

export default ( initialState ) => createStore( reducer, initialState );
