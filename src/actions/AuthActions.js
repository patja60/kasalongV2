import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS
} from './types';
import { provider } from '../database';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const checkLogin = () => {
  return (dispatch) => {
    window.fbAsyncInit = function() {
       window.FB.init({
         appId      : '236477100371787',
         cookie     : true,
         xfbml      : true,
         version    : 'v3.1'
       });

       window.FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
           console.log(response.authResponse.accessToken);
           console.log(response.authResponse.userID);
           login(response.authResponse.accessToken);
         }
       });

       function login(accessToken) {
         var credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
         firebase.auth().signInAndRetrieveDataWithCredential(credential)
         .then(user => loginUserSuccess(dispatch, user));
       };
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };
};


export const loginUserWithFacebook = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(provider)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
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
