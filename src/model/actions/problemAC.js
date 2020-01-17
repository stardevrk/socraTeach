import * as types from '../actionTypes';

export function fetchProblem (subject, problems, lastProblem, blockIndex = 0) {
    return {
        type: types.RETRIVE_PROBLMES,
        subject,
        problems,
        lastProblem,
        blockIndex
    }
}

export function fetchMoreProblems (subject, problems, lastProblem, blockIndex) {
    return {
        type: types.RETRIVE_PROBLMES,
        subject,
        problems,
        lastProblem,
        blockIndex
    }
}

export function clearProblems() {
    return {
        type: types.CLEAR_PROBLEMS
    }
}