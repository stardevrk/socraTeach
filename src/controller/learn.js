import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
import {clearListeners, clearUserListener, hasListener, addListener, offListenerWithPrefix} from './listeners';
import {fetchMyLearnProblems, fetchMyLearnProblemsMore, clearMyLearnProblems} from '../model/actions/learnAC';
import _ from 'lodash';

export function getMyInitLearnList () {
  return async function (dispatch, getState) {
    try {
      if (!hasListener('my_learn_' + 0)) {
        
        var listener = firestore.collection('users')
        .doc(auth.currentUser.uid).collection('learn')
        .orderBy('uploadTime', 'DESC')
        .limit(50)
        .onSnapshot((snapShot) => {
          if (snapShot.docs.length > 0) {
            let problemArray = [];
            let lastProblem = snapShot.docs[snapShot.docs.length - 1];
            snapShot.forEach((doc) => {
              let problemData = doc.data();
              // problemData['userName'] = '';
              // if (problemData.teacherId != undefined && problemData.teacherId != null) {
              //   firestore.collection('users').doc(problemData.teacherId).get().then((teacherDoc) => {
              //     const userData = teacherDoc.data();
              //     problemData['userName'] = userData.userName;
              //   })
              // }
              problemArray.push(problemData);
            })
            dispatch(fetchMyLearnProblems(problemArray, lastProblem, 0));
          }
        });
        addListener('my_learn_' + 0, listener);
      }
    } catch (e) {
      console.log("Fetch My Learn Problem Error = ", e);
    }
  }
}

export function getMyMoreLearnList () {
  return async function (dispatch, getState) {
    try {

      const currentState = getState();
      const teachObject = _.get(currentState, 'myLearn', {});
      const prevLastProblem = _.get(teachObject, 'lastProblem', null);
      const prevBlockIndex = _.get(teachObject, 'blockIndex', 0);
      const currentBlockIndex = prevBlockIndex + 1;

      if (!hasListener('my_learn_' + currentBlockIndex)) {  
        var listener = firestore.collection('users')
        .doc(auth.currentUser.uid).collection('learn')
        .orderBy('uploadTime', 'DESC')
        .startAfter(prevLastProblem)
        .limit(50)
        .onSnapshot((snapShot) => {
          if (snapShot.docs.length > 0) {
            let problemArray = [];
            let lastProblem = snapShot.docs[snapShot.docs.length - 1];
            snapShot.forEach((doc) => {
              let problemData = doc.data();
              // problemData['userName'] = '';
              // if (problemData.teacherId != undefined && problemData.teacherId != null) {
              //   firestore.collection('users').doc(problemData.teacherId).get().then((teacherDoc) => {
              //     problemData['userName'] = userData.userName;
              //   });
              // }
              problemArray.push(problemData);
            })
            dispatch(fetchMyLearnProblemsMore(problemArray, lastProblem, currentBlockIndex));
          }
        });
        addListener('my_learn_' + currentBlockIndex, listener);
      }
    } catch (e) {
      console.log("Fetch My Learn Problem Error = ", e);
    }
  }
}

export function clearMyLearnList() {
  return async function (dispatch, getState) {
    try {
      offListenerWithPrefix('my_learn');
      dispatch(clearMyLearnProblems());
    } catch (e) {
      console.log("Clear My Learn Problem Error = ", e);
    }
  }
}