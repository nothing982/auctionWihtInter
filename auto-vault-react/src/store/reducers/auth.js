import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    user: null,
    err: null,
    loading: false,
    isAuthenticated: false,
    redirectPath: '/',
    createdUser: false
};

const registerSucess = (state, action) => {
    return updateObject(state, { err: null, createdUser: true });
}

const registerFail = (state, action) => {
    return updateObject(state, { err: action.err, });
}

const loginSuccess = (state, action) => {
    return updateObject(state, { err: null, token: action.token, userId: action.userId, user: action.user, isAuthenticated: true });
}

const loginFail = (state, action) => {
    return updateObject(state, { err: action.err, isAuthenticated: false });
}

const logoutSuccess = (state, action) => {
    return updateObject(state, {token: null, userId: null, user:null, redirectPath: '/', isAuthenticated: false })
}

const openRegister = (state, action) => {
    return updateObject(state, { createdUser: false });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { redirectPath: action.path })
}

const clearError = (state, action) => {
    return updateObject(state, { err: null });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_SUCCESS: return registerSucess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.SET_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        case actionTypes.OPEN_REGISTER: return openRegister(state, action);
        case actionTypes.CLEAR_ERROR: return clearError(state, action);
        default: return state;
    }
}

export default reducer;