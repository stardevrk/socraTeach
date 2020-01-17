import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
// import {fetchUser, logoutUser} from '../model/actions/userAC';
import {clearListeners, clearUserListener, hasListener, addListener, offListenerWithPrefix} from './listeners';
import _ from 'lodash';

export async function selectProblem(subject, problem) {
  // console.log("Problem Select ID = ", problem.problemId);
  firestore.collection(subject.toLowerCase()).doc(problem.problemId).update({
    sessionExist: true,
    teacherId: auth.currentUser.uid
  })
}