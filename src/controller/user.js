import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
import {fetchUser, logoutUser} from '../model/actions/userAC';
import {fetchSubjects} from '../model/actions/subjectAC';
import {clearListeners, clearUserListener, hasListener, addListener} from './listeners';
import {updatePoster, updateTeacher} from '../model/actions/sessionAC';

export function getPosterInfo(posterId) {
  return async function (dispatch, getState) {
    try {
      firestore.collection('users').doc(posterId).get().then((posterDoc) => {
        let posterData = posterDoc.data();
          dispatch(updatePoster(posterData, posterId));
      })
    } catch (e) {
      console.log('Get Poster Info error', e);
    }
  }
}

export function getTeacherInfo (teacherId) {
  console.log("teacherId ^^^^^^^^^^^^^^^^^", teacherId);
  return async function (dispatch, getState) {
    try {
      firestore.collection('users').doc(teacherId).get().then((teacherDoc) => {
        let teacherData = teacherDoc.data();
          dispatch(updateTeacher(teacherData, teacherId));
      })
    } catch (e) {
      console.log('Get Teacher Info error', e);
    }
  }
}