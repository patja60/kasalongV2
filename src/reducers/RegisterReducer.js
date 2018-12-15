import {
  UPDATE_SUBJECT_DATA,
  UPDATE_USER_DATA,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  subjectData: null,
  userData: null,
  isLoading: true,
  isInitializing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "alreadylogin":
      return { ...state, isLoading: false, isInitializing: true };
    case "notAlreadylogin":
      return { ...state, isLoading: false };
    case LOGOUT_USER:
      return { ...state, isLoading: false, isInitializing: false };
    case UPDATE_SUBJECT_DATA:
      return { ...state, subjectData: action.payload };
    case UPDATE_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
