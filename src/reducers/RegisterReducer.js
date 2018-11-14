import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  SUBJECT_NAME_CHANGED,
  SUBJECT_ID_CHANGED,
  SUBJECT_PASSWORD_CHANGED,
  CREATE_SUBJECT,
  CREATE_SEBJECT_SUCCESS,
  CREATE_SEBJECT_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  data: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case "update":
      return { ...state, data: action.payload };
