import {
  CREATE_USERNAME_CHANGED,
  CREATE_PASSWORD_CHANGED,
  CREATE_USER
} from '../actions/types';

const INITIAL_STATE = {
  createUsername: '',
  createPassword: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case CREATE_USERNAME_CHANGED:
      return { ...state, createUsername: action.payload };
    case CREATE_PASSWORD_CHANGED:
      return { ...state, createPassword: action.payload };
    default:
      return state;
  }
};
