import { combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer
})

const storeConfig = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

//configureStore({         
//    reducer: reducers,         
//    middleware: (getDefaultMiddleware) => 
//        getDefaultMiddleware({             
//            immutableCheck: false,             
//            serializableCheck: false,        
//        })     
//    }
//) 

export default storeConfig