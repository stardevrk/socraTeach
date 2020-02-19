import {combineReducers} from 'redux';
import user from './user';
import signupInfo from './singup';
import subject from './subject';
import problem from './problem';
import myTeach from './myTeach';
import myLearn from './myLearn';
import chat from './chat';
import session from './session';
import myLiveLearn from './myLiveLearn';
import login from './login';
import ltSession from './ltSession';

export default combineReducers({
  user,
  signupInfo,
  subject,
  problem,
  myTeach,
  myLearn,
  chat,
  session,
  myLiveLearn,
  login,
  ltSession
})