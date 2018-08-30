import firebase from 'firebase';
import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER,
  SUBJECT_NAME_CHANGED,
  SUBJECT_ID_CHANGED,
  SUBJECT_PASSWORD_CHANGED
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
  return () => {
    firebase.database().ref(`/student`)
    .child(createUsername).set({ password: createPassword });
  };
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
  return () => {
    firebase.database().ref(`/subject`)
    .child(subjectName).set({ subjectId: subjectId, subjectPassword: subjectPassword });
  };
};
