import axios from 'axios';
import * as actionTypes from './actionTypes';
import persistor from '../../index';

let logOutTimer;

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path: path,
  };
};

export const openRegister = () => {
  return {
    type: actionTypes.OPEN_REGISTER,
  };
};

export const registerSuccess = (userId) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    userId: userId,
  };
};

export const registerFail = (err) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    err: err,
  };
};

export const loginSuccess = (token, userId, user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId,
    user: user,
  };
};

export const loginFail = (err) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    err: err,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('user');
    await persistor.purge();
    if (logOutTimer) {
      clearTimeout(logOutTimer);
    }
    dispatch(logoutSuccess());
  };
};

export const signUp = (
  name,
  username,
  email,
  password,
  confirmPassword,
  phone,
  consumerType
) => {
  return (dispatch) => {
    const userForm = {
      name: name,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
      consumerType: consumerType,
    };
    console.log(userForm);
    axios
      .post('http://localhost:5000/auth/signup/', userForm)
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        dispatch(registerSuccess());
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data.data[0].msg));
      });
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    const userLoginForm = {
      username: username,
      password: password,
    };

    axios
      .post('http://localhost:5000/auth/signin/', userLoginForm)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Wrong email or password');
        }
        const userData = JSON.parse(JSON.stringify(res.data.user));
        dispatch(loginSuccess(res.data.token, res.data.userId, userData));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('user', userData);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(setAutoLogout(remainingMilliseconds));
      })
      .catch((err) => {
        console.log('err');
        dispatch(loginFail(err));
      });
  };
};
const setAutoLogout = (milliseconds) => {
  return (dispatch) => {
    logOutTimer = setTimeout(() => {
      dispatch(logout());
      console.log('hello');
    }, milliseconds);
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  };
};
