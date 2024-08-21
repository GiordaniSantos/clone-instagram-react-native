import { combineReducers } from "redux";
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user'

const reducers = combineReducers({
    user: userReducer
})

const storeConfig = configureStore({
    reducer: reducers,
});

export default storeConfig