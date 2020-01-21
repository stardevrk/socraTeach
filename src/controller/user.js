import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
import {fetchUser, logoutUser} from '../model/actions/userAC';
import {fetchSubjects} from '../model/actions/subjectAC';
import {clearListeners, clearUserListener, hasListener, addListener} from './listeners';
import {updatePosterName, updateTeacherName} from '../model/actions/sessionAC';

export function getPosterName (posterId) {
  return async function (dispatch, getState) {
    try {
      firestore.collection('users').doc(posterId).onSnapshot((posterDoc) => {
        let posterData = posterDoc.data();
          // this.setState({posterName: posterData.userName});
          dispatch(updatePosterName(posterData.userName));
      })
    } catch (e) {
      console.log('Get Poster Name error', e);
    }
  }
}

export function getTeacherName (teacherId) {
  return async function (dispatch, getState) {
    try {
      firestore.collection('users').doc(teacherId).onSnapshot((teacherDoc) => {
        let teacherData = teacherDoc.data();
          // this.setState({posterName: posterData.userName});
          dispatch(updateTeacherName(teacherData.userName));
      })
    } catch (e) {
      console.log('Get Poster Name error', e);
    }
  }
}