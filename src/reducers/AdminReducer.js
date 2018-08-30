import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER,
  SUBJECT_NAME_CHANGED,
  SUBJECT_ID_CHANGED,
  SUBJECT_PASSWORD_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  createUsername: '',
  createPassword: '',
  subjectName: '',
  subjectId: '',
  subjectPassword: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case CREATE_USERNAME_CHANGED:
      return { ...state, createUsername: action.payload };
    case CREATE_PASSWORD_CHANGED:
      return { ...state, createPassword: action.payload };
    case SUBJECT_NAME_CHANGED:
      return { ...state, subjectName: action.payload };
    case SUBJECT_ID_CHANGED:
      return { ...state, subjectId: action.payload };
    case SUBJECT_PASSWORD_CHANGED:
      return { ...state, subjectPassword: action.payload };
    default:
      return state;
  }
};
