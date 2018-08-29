import firebase from 'firebase';
import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER
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
    var newPostRef = firebase.database().ref(`/student`)
    .push({ username: createUsername, password: createPassword })
    console.log(newPostRef.key);
    var newPostRef = firebase.database().ref(`/username`)
    .child(createUsername).set({ uid: newPostRef.key, password: createPassword })
  };
};
