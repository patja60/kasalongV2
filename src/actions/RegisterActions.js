import firebase from 'firebase';
import {
  UPDATE_SUBJECT_DATA,
  UPDATE_USER_DATA,
  UPDATE_TEACHER_DATA
} from './types';
import { provider } from '../database';

export const fetchTeacher = () => {
  return (dispatch) => {
    //console.log("subject**: "+JSON.stringify(firebase.auth().currentUser));
    const subjectId = firebase.auth().currentUser.email.substring(0,5).toUpperCase();
    firebase.database().ref(`/subject/${subjectId}/`)
    .on('value', function(snapshot) {
      updateTeacherData(dispatch,snapshot.val());
    });
  };
};

export const fetchSubject = () => {
  return (dispatch) => {
    firebase.database().ref(`/subject/`)
    .on('value', function(snapshot) {
      let list = [];
      Object.keys(snapshot.val()).forEach(function(key) {
        let data = {};
        Object.keys(snapshot.val()[key]).forEach(function(key2) {
          //console.log(key2, snapshot.val()[key][key2]);
          data[key2] = snapshot.val()[key][key2];
        });
        list.push(data);
      });
      // console.log("subject data: " + JSON.stringify(list))
      updateSubjectData(dispatch,list);
    });
  };
};

export const fetchUserData = () => {
  if(firebase.auth().currentUser){
    return (dispatch) => {
      var user = firebase.auth().currentUser;
      console.log(user.uid)
      firebase.database().ref(`/student/${user.uid}`)
      .on('value', function(snapshot) {
        console.log("user data: " + JSON.stringify(snapshot.val()));
        updateUserData(dispatch,snapshot.val());
      });
    };
  }else{
    return (dispatch) => {
      notAlreadyLogin(dispatch);
    };
  }
};

const notAlreadyLogin = dispatch => {
  dispatch({
    type: "notAlreadylogin"
  });
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

export const updateTeacherData = (dispatch,val) => {
  dispatch({
    type: UPDATE_TEACHER_DATA,
    payload: val
  });
};
