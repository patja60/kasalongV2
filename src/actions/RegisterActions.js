import firebase from 'firebase';
import {
  UPDATE_SUBJECT_DATA,
  UPDATE_USER_DATA,
} from './types';
import { provider } from '../database';

export const fetchSubject = () => {
  return (dispatch) => {
    firebase.database().ref(`/subject/`)
    .on('value', function(snapshot) {
      //console.log("subject data: " + JSON.stringify(snapshot.val()));
      let list = [];
      Object.keys(snapshot.val()).forEach(function(key) {
        let data = {};
        Object.keys(snapshot.val()[key]).forEach(function(key2) {
          //console.log(key2, snapshot.val()[key][key2]);
          data[key2] = snapshot.val()[key][key2];
        });
        list.push(data);
      });
      updateSubjectData(dispatch,list);
    });
  };
};

export const fetchUserData = () => {
  return (dispatch) => {
    var user = firebase.auth().currentUser;
    firebase.database().ref(`/student/${user.uid}`)
    .on('value', function(snapshot) {
      //console.log("user data: " + JSON.stringify(snapshot.val()));
      updateUserData(dispatch,snapshot.val());
    });
  };
};

export const updateSubjectData = (dispatch,val) => {
  dispatch({
    type: UPDATE_SUBJECT_DATA,
    payload: val
  });
};

export const updateUserData = (dispatch,val) => {
  dispatch({
    type: UPDATE_USER_DATA,
    payload: val
  });
};
