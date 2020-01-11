import {auth} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';

let firstAuth = true;

async function onAuthStateChanged (authData) {
  console.log('authData', authData)
  if (authData) {
    // await fetchUser(authData)
    navigationService.navigate(pages.APP)
  } else {
    console.log('onAuthStateChanged authData null')
    // clearListeners()
    // clearUserListener()
    firstAuth = true
    navigationService.navigate(pages.AUTH)
    // store.dispatch(logoutUser())
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