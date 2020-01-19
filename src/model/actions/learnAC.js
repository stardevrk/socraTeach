import * as types from '../actionTypes';

export function fetchMyLearnProblems(problems, lastProblem, blockIndex) {
  return {
    type: types.RECEIVE_MYLEARN_LIST,
    problems,
    lastProblem,
    blockIndex
  }
}

export function fetchMyLearnProblemsMore(problems, lastProblem, blockIndex) {
  return {
    type: types.RECEIVE_MYLEARN_MORE,
    problems,
    lastProblem,
    blockIndex
  }
}

export function clearMyLearnProblems(){
  return {
    type: types.CLEAR_MYTEACH_LIST
  }
}