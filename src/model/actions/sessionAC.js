import * as types from '../actionTypes';

export function updateSession (sessionType, subject, problemId, problemData) {
    return {
        type: types.SESSION_UPDATE,
        sessionType,
        subject,
        problemId,
        problemData
    }
}

export function clearSession() {
    return {
        type: types.SESSION_CLEAR
    }
}

export function updatePosterName(posterName) {
  return {
    type: types.SESSION_GET_POSTERNAME,
    posterName
  }
}

export function updateTeacherName(teacherName) {
  return {
    type: types.SESSION_GET_TEACHERNAME,
    teacherName
  }
}