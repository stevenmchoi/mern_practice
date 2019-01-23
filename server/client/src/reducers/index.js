// Called 'index.js' to import 'reducers' folder, which,
//   by convention, uses the 'index.js' file
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({ auth: authReducer });
