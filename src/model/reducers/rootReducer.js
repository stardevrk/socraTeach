import {combineReducers} from 'redux';
import user from './user';
import signupInfo from './singup';
import subject from './subject';
import problem from './problem';

export default combineReducers({
  user,
  signupInfo,
  subject,
  problem
})