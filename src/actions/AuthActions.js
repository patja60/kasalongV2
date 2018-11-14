import firebase from 'firebase';
import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER
} from './types';
import { provider } from '../database';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginAdmin = (password) => {
  return (dispatch) => {
    firebase.database().ref(`/admin/password`).once('value')
    .then((snapshot) => {
      if(password == snapshot.val()) {
        loginUserSuccess(dispatch, "admin");
      }
    });
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    username = username + '@camp.com';
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      loginUserFail(dispatch);
      console.log(error);
    });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
