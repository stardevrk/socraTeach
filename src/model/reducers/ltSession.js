import * as types from '../actionTypes';
import _ from 'lodash';

const initialState = {
  learn_session: {},
  teach_session: {}
};

export default function user (state = initialState, action = '') {
  switch (action.type) {
    case types.LSESSION_GET: 
      return {
        ...state,
        learn_session: {
          ..._.get(state, 'learn_session', {}),
          ...action.sessionData
        }
      }
    case types.TSESSION_GET:
      return {
        ...state,
        teach_session: {
          ..._.get(state, 'teach_session', {}),
          ...action.sessionData
        }
      }
    case types.LTSESSION_CLEAR:
      return initialState;
    default :
      return state
  }
}