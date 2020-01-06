import * as types from '../actionTypes';

const initialState = null;

export default function user (state = initialState, action = '') {
  switch (action.type) {
    case types.LOGOUT:
      return initialState
    default :
      return state
  }
}