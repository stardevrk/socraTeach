import * as types from '../actionTypes';

export function fetchSubjects (problem) {
    return {
        type: types.TEACH_SELECT,
        problem
    }
}