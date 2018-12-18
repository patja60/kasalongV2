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
  CREATE_SEBJECT_FAILED,
  CREATE_NAME_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  createUsername: '',
  createName: '',
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
    case CREATE_NAME_CHANGED:
      return { ...state, createName: action.payload };
    case CREATE_PASSWORD_CHANGED:
      return { ...state, createPassword: action.payload };
    case CREATE_USER:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, createUsername: '', createPassword: '', loading: false };
    case CREATE_USER_FAILED:
      return { ...state, loading: false };
    case SUBJECT_NAME_CHANGED:
      return { ...state, subjectName: action.payload };
    case SUBJECT_ID_CHANGED:
      return { ...state, subjectId: action.payload };
    case SUBJECT_PASSWORD_CHANGED:
      return { ...state, subjectPassword: action.payload };
    case CREATE_SUBJECT:
      return { ...state, loading: true };
    case CREATE_SEBJECT_SUCCESS:
      return { ...state, subjectName: '', subjectId: '', subjectPassword: '', loading: false };
    case CREATE_SEBJECT_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
