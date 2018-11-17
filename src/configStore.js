import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";

import ReduxThunk from "redux-thunk";
import dbconfig from "./database";
import AuthReducer from "./reducers/AuthReducer";
import AdminReducer from "./reducers/AdminReducer";

const firebaseConfig = dbconfig;

// react-redux-firebase config
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
  admin: AdminReducer
});

// Create store with reducers and initial state
const initialState = {};
export const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
