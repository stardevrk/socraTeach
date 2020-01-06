import * as types from '../actionTypes';

export function logoutUser () {
    return {
        type: types.LOGOUT
    }
}



export function clear (user) {
    return {
        type: types.CLEAR
    }
}