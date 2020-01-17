import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
// import {fetchUser, logoutUser} from '../model/actions/userAC';
import {fetchProblem, fetchMoreProblems, clearProblems} from '../model/actions/problemAC';
import {clearListeners, clearUserListener, hasListener, addListener, offListenerWithPrefix} from './listeners';
import _ from 'lodash';

export function fetchInitProblem(subject) {
  return async function (dispatch, getState) {
    try {
      // const state = getState();
      // const subjects = _.get(state, 'subject');
      // console.log("Controller Subjects =", subjects);
      if (!hasListener('problems_' + subject + '_' + 0)) {
        
        var listener = firestore.collection(subject)
        .where('sessionExist', '==', false)
        .orderBy('updateTime', 'ASC')
        .limit(10)
        .onSnapshot((snapShot) => {
          if (snapShot.docs.length > 0) {
            let problemArray = [];
            let lastProblem = snapShot.docs[snapShot.docs.length - 1];
            snapShot.forEach((doc) => {
              // dispatch(fetchProblem(subject, doc.data()));
              problemArray.push(doc.data());
            })
            dispatch(fetchProblem(subject, problemArray, lastProblem, 0));
          }
        });
        addListener('problems_' + subject + '_' + 0, listener);
      }
    } catch (e) {
      console.log("Fetch Initital Problem Error = ", e);
    }
  }
}

export function getMoreProblems(subject) {
  return async function (dispatch, getState) {
    try {
      const currentState = getState();
      const subjectObject = _.get(currentState, subject, {});
      const prevLastProblem = _.get(subjectObject, 'lastProblem', null);
      const prevBlockIndex = _.get(subjectObject, 'blockIndex', 0);
      const currentBlockIndex = prevBlockIndex + 1;

      if (lastProblem != null) {
        if(!hasListener('problems_' + subject + '_' + currentBlockIndex)) {
          var listener = firestore.collection(subject)
          .where('sessionExist', '==', false)
          .orderBy('updateTime', 'ASC')
          .startAfter(prevLastProblem)
          .limit(20)
          .onSnapshot((snapShot) => {
            if (snapShot.docs.length > 0) {
              let problemArray = [];
              let lastProblem = snapShot.docs[snapShot.docs.length - 1];
              snapShot.forEach((doc) => {
                // dispatch(fetchProblem(subject, doc.data()));
                problemArray.push(doc.data());
              })
              dispatch(fetchMoreProblems(subject, problemArray, lastProblem, currentBlockIndex));
            }
          });
          addListener('problems_' + subject + '_' + currentBlockIndex, listener);
        }
      }
    } catch (e) {
      console.log("Fetch More Problems Error = ", e);
    }
  }
}

export function clearSubjectProblems(subject) {
  return async function (dispatch, getState) {
    try {
      offListenerWithPrefix('problems_' + subject);
      dispatch(clearProblems());
    } catch (e) {
      console.log("Fetch Initital Problem Error = ", e);
    }
  }
}