import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  err: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, password: '' };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '' };
    case LOGOUT_USER:
      return { ...state, user: null, error: '' };
    default:
      return state;
  }
};
