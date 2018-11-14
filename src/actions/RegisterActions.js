import firebase from 'firebase';
import {

} from './types';
import { provider } from '../database';

export const fetchSubject = () => {
  return (dispatch) => {
    console.log("fetch");
    firebase.database().ref(`/subject/`)
    .on('value', function(snapshot) {
      console.log("try");
      console.log(snapshot.val());
      updateData(snapshot.val());
    });
  };
};

export const updateData = (val) => {
  return {
    type: "update",
    payload: val
  };
};
