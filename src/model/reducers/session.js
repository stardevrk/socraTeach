import * as types from '../actionTypes';

const initialState = {};

export default function user (state = initialState, action = '') {
  switch (action.type) {
    case types.SESSION_UPDATE:
      return {
        sessionType: action.sessionType,
        subject: action.subject,
        problemId: action.problemId,
        problemData: action.problemData
      }
    case types.SESSION_CLEAR:
      return initialState
    case types.SESSION_GET_POSTERNAME:
      return {
        ...state,
        posterName: action.posterName
      }
    case types.SESSION_GET_TEACHERNAME:
      return {
        ...state,
        teacherName: action.teacherName
      }
    default :
      return state
  }
}