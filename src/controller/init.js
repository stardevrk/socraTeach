import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
import {fetchUser, logoutUser} from '../model/actions/userAC';
import {fetchSubjects} from '../model/actions/subjectAC';
import {clearListeners, clearUserListener, hasListener, addListener} from './listeners';

let firstAuth = true;

async function getSubjectInfo() {
  try {
    if (!hasListener('subjects')) {
      let subListener = firestore.collection('subjects').onSnapshot((sn) => {
        let subjects = [];
        sn.forEach((doc) => {
          subjects.push(doc.data());
        })
        store.dispatch(fetchSubjects(subjects));
      })
      addListener('subjects', subListener);
    }
  } catch (e) {
    console.log("Getting Subject List Error ", e);
  }
}

async function getUserInfo (authData) {
  try {
    console.log('fetchUser', authData.uid)
    const userId = authData.uid
    
    firestore.collection('users').doc(userId).get().then(doc => {
      console.log("User Data = ", doc.data());
      store.dispatch(fetchUser(doc.data()));
    });
    
  } catch (e) {
    console.log('fetch user error', e)
  }
}

async function onAuthStateChanged (authData) {
  console.log('authData', authData)
  if (authData) {
    await getUserInfo(authData);
    await getSubjectInfo();
    navigationService.navigate(pages.APP)
  } else {
    console.log('onAuthStateChanged authData null')
    clearListeners()
    clearUserListener()
    firstAuth = true
    navigationService.navigate(pages.AUTH)
    store.dispatch(logoutUser())
    // setCompanyName('')
  }
}

export function appInitialized () {
  return async function (dispatch, getState) {
    try {
      console.log('appInitialized');
      auth.onAuthStateChanged(onAuthStateChanged)
    } catch (e) {
      console.log('app initialization error', e);
    }
  }
}