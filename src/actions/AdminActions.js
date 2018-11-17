import firebase from 'firebase';
import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER,
  SUBJECT_NAME_CHANGED,
  SUBJECT_ID_CHANGED,
  SUBJECT_PASSWORD_CHANGED,
  CREATE_SEBJECT_SUCCESS,
  CREATE_SEBJECT_FAILED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED
} from './types';
import { provider } from '../database';

export const createUsernameChanged = (text) => {
  return {
    type: CREATE_USERNAME_CHANGED,
    payload: text
  };
};

export const createPasswordChanged = (text) => {
  return {
    type: CREATE_PASSWORD_CHANGED,
    payload: text
  };
};

export const createUser = ({ createUsername, createPassword }) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const defaultData = {
      username: createUsername,
      password: createPassword,
      studentTime: 0,
      registeredSubject: 0
    };
    firebase.database().ref(`/student/${user.uid}/`)
    .set(defaultData)
    .then(() => {
      createUserSuccess(dispatch);
    })
    .catch((err) => {
      createUserFailed(dispatch);
      console.log(err);
    });
  };
};

export const createUserSuccess = (dispatch) => {
  dispatch({ type: CREATE_USER_SUCCESS });
};

export const createUserFailed = (dispatch) => {
  dispatch({ type: CREATE_USER_FAILED });
};

export const subjectNameChanged = (text) => {
  return {
    type: SUBJECT_NAME_CHANGED,
    payload: text
  };
};

export const subjectIdChanged = (text) => {
  return {
    type: SUBJECT_ID_CHANGED,
    payload: text
  };
};

export const subjectPasswordChanged = (text) => {
  return {
    type: SUBJECT_PASSWORD_CHANGED,
    payload: text
  };
};

export const createSubject = ({ subjectName, subjectId, subjectPassword }) => {
  return (dispatch) => {
    firebase.database().ref(`/subject`)
    .child(subjectName).set({ subjectName: subjectName, subjectId: subjectId, subjectPassword: subjectPassword })
    .then(() => {
      createSubjectSuccess(dispatch);
    })
    .catch(() => {
      createSubjectFailed(dispatch);
    });
  };
};

export const createSubjectSuccess = (dispatch) => {
  dispatch({ type: CREATE_SEBJECT_SUCCESS });
};

export const createSubjectFailed = (dispatch) => {
  dispatch({ type: CREATE_SEBJECT_FAILED });
};
