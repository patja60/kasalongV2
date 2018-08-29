import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
  auth: AuthReducer,
  admin: AdminReducer
});
