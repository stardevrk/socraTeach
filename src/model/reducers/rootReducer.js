import {combineReducers} from 'redux';
import user from './user';
import signupInfo from './singup';
import subject from './subject';
import problem from './problem';
import myTeach from './myTeach';
import myLearn from './myLearn';
import chat from './chat';

export default combineReducers({
  user,
  signupInfo,
  subject,
  problem,
  myTeach,
  myLearn,
  chat
})