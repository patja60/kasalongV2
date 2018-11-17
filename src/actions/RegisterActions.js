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
      console.log("subject data: " + snapshot.val());
      updateSubjectData(dispatch,snapshot.val());
    });
  };
};

export const fetchUserData = () => {
  return (dispatch) => {
    var user = firebase.auth().currentUser;
    console.log("from fetch user ",user);
    firebase.database().ref(`/student/${user.uid}`)
    .on('value', function(snapshot) {
      console.log("user data: " + snapshot.val().username);
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
