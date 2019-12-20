import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";

import ReduxThunk from "redux-thunk";
import {dbconfig} from "./database";
import AuthReducer from "./reducers/AuthReducer";
import AdminReducer from "./reducers/AdminReducer";
import RegisterReducer from "./reducers/RegisterReducer";

const firebaseConfig = dbconfig;

// react-redux-firebase config
// add comment
const rrfConfig = {
  userProfile: "users"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: AuthReducer,
  admin: AdminReducer,
  register: RegisterReducer
});

// Create store with reducers and initial state
const initialState = {};
const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
export const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    applyMiddleware(ReduxThunk),
  )
);
