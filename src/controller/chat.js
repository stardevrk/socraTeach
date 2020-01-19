import {auth, firestore} from '../constants/firebase';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import store from '../model/store';
// import {fetchUser, logoutUser} from '../model/actions/userAC';
// import {fetchProblem, fetchMoreProblems, clearProblems} from '../model/actions/problemAC';
import {fetchInitChats, fetchMoreChats, clearChats, fetchChatUsers} from '../model/actions/chatAC';
import {clearListeners, clearUserListener, hasListener, addListener, offListenerWithPrefix} from './listeners';
import _ from 'lodash';

export function getChatUsers(subject, problemId) {
  return async function (dispatch, getState) {
    try {
      if (!hasListener('chat_users_'+ subject + '_' + problemId)) {
        let channelListener = firestore.collection(subject).doc(problemId).onSnapshot(sn => {
          let problemData = sn.data();
          
          if (!hasListener('chat_users_' + problemData.posterId)) {
            let posterListener = firestore.collection('users').doc(problemData.posterId).onSnapshot(sn => {
              let postUserData = {};
              postUserData[sn.id] = sn.data();
              dispatch(fetchChatUsers(postUserData));
            })
            addListener('chat_users_' + problemData.posterId, posterListener);
          }
          if (problemData.teacherId != undefined && problemData.teacherId != null && !hasListener('chat_users_' + problemData.teacherId)) {
            let teacherListener = firestore.collection('users').doc(problemData.teacherId).onSnapshot(sn => {
              let teacherData = {};
              teacherData[sn.id] = sn.data();
              dispatch(fetchChatUsers(teacherData));
            })
            addListener('chat_users_' + problemData.teacherId, teacherListener);
          }
        })
        addListener('chat_users_'+ subject + '_' + problemId, channelListener);
      }
    } catch(e) {
      console.log("Fetch Chat Channel User Info Error = ", e);
    }
  }
}

export function getInitChats(subject, problemId) {
  return async function (dispatch, getState) {
    try {
      let newLastProblem = null;
      let currentState = getState();
      let chatObject = _.get(currentState, 'chat', {});
      
      firestore.collection(subject).doc(problemId).collection('messages')
      .orderBy('timestamp', 'DESC').limit(10).get().then(sn => {
        
        newLastProblem = sn.docs[sn.docs.length - 1];

        if (!hasListener('chats_' + subject + '_' + problemId + '_' + 0)) {
          var listener = firestore.collection(subject).doc(problemId).collection('messages')
          .orderBy('timestamp', 'DESC')
          .endAt(newLastProblem)
          .onSnapshot((snapShot) => {
            // 
            if (!snapShot.empty) {
              let chatsData = {};
              snapShot.forEach((doc) => {
                // dispatch(fetchProblem(subject, doc.data()));
                let chatData = doc.data();
                chatsData[doc.id] = {
                  _id: chatData._id,
                  text: chatData.text,
                  createdAt: new Date(chatData.timestamp),
                  sentBy: chatData.sentBy
                };
              })
              dispatch(fetchInitChats(chatsData, subject, problemId, newLastProblem, 0));
            }
          });
          addListener('chats_' + subject + '_' + problemId + '_' + 0, listener);
        }
      });
      
    } catch (e) {
      console.log("Fetch Initital Chat Error = ", e);
    }
  }
}

export function getMoreChats(subject, problemId) {
  return async function(dispatch, getState) {
    try {
      let newLastProblem = null;
      let currentState = getState();
      let chatObject = _.get(currentState, 'chat', {});
      let prevLastProblem = _.get(chatObject, 'lastProblem', null);
      let prevBlockIndex = _.get(chatObject, 'blockIndex', null);
      let currentBlockIndex = parseInt(prevBlockIndex) + 1;
      firestore.collection(subject).doc(problemId).collection('messages')
      .orderBy('timestamp', 'DESC').startAt(prevLastProblem).limit(20).get().then(sn => {
        newLastProblem = sn.docs[sn.docs.length - 1];

        if (!hasListener('chats_' + subject + '_' + problemId + '_' + currentBlockIndex)) {
          var listener = firestore.collection(subject).doc(problemId).collection('messages')
          .orderBy('timestamp', 'DESC')
          .startAfter(prevLastProblem).endAt(newLastProblem)
          .onSnapshot((snapShot) => {
            if (!snapShot.empty) {
              let chatsData = {};
              snapShot.forEach((doc) => {
                // dispatch(fetchProblem(subject, doc.data()));
                let chatData = doc.data();
                chatsData[doc.id] = {
                  _id: chatData._id,
                  text: chatData.text,
                  createdAt: new Date(chatData.timestamp),
                  sentBy: chatData.sentBy
                };
              })
              dispatch(fetchMoreChats(chatsData, subject, problemId, newLastProblem, currentBlockIndex));
            }
          })
          addListener('chats_' + subject + '_' + problemId + '_' + currentBlockIndex, listener);
        }
      })
    } catch(e) {
      console.log("Fetch More Chats Error = ", e);
    }
  }
}

export function sendMessage (subject, problemId, message) {
  // console.log("Subject =====", subject);
  return async function(dispatch, getState) {
    try {
      await firestore.collection(subject).doc(problemId).collection('messages').doc(message._id).set({
        _id: message._id,
        text: message.text,
        sentBy: auth.currentUser.uid,
        // createdAt: message.createdAt,
        timestamp: Date.now()
      })
    } catch (e) {
      console.log("Send message Error ==== ", e);
    }
  }
}

export function clearChatsData(subject, problemId) {
  return async function (dispatch, getState) {
    try {
      offListenerWithPrefix('chats_');
      dispatch(clearChats());
    } catch (e) {
      console.log("Fetch Initital Problem Error = ", e);
    }
  }
}