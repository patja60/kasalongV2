import {
  UPDATE_SUBJECT_DATA,
  UPDATE_USER_DATA,
  UPDATE_TEACHER_DATA,
  LOGOUT_USER,
  LOGOUT_TEACHER,
} from '../actions/types';

const INITIAL_STATE = {
  subjectData: null,
  userData: null,
  teacherData: null,
  isLoading: true,
  isInitializing: false,
  teacherIsLoading: true,
  teacherIsInitializing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "teacherAlreadylogin":
      return { ...state, teacherIsLoading: false, teacherIsInitializing: true, isLoading: false };
    case "alreadylogin":
      return { ...state, isLoading: false, isInitializing: true, teacherIsLoading: false };
    case "userNotAlreadyLogin":
      return { ...state, isLoading: false, nav: false };
    case "teacherNotAlreadyLogin":
      return { ...state, teacherIsLoading: false, nav: false };
    case LOGOUT_USER:
      return { ...state, isLoading: false, isInitializing: false, userData: null };
    case LOGOUT_TEACHER:
      return { ...state, teacherIsLoading: false, teacherIsInitializing: false, teacherData: null };
    case UPDATE_SUBJECT_DATA:
      return { ...state, subjectData: action.payload };
    case UPDATE_USER_DATA:
      return { ...state, userData: action.payload };
    case UPDATE_TEACHER_DATA:
      return { ...state, teacherData: action.payload };
    default:
      return state;
  }
};
