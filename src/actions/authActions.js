import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  CHECK_AUTH_STATUS_SUCCESS,
  CHECK_AUTH_STATUS,
  AUTH_ERROR,
} from './types';

export const checkAuthStatus = () => ({
  type: CHECK_AUTH_STATUS,
});
export const checkAuthStatusSuccess = (token) => ({
  type: CHECK_AUTH_STATUS_SUCCESS,
  payload: token,
});
export const loginUser = (model) => {
  return {
    type: LOGIN_USER,
    payload: model,
  };
};

export const loginUserSuccess = (result) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: result,
  };
};

export const loginUserFailure = () => {
  return {
    type: LOGIN_USER_FAILURE,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
};
export const logoutUserFailure = () => {
  return {
    type: LOGOUT_USER_FAILURE,
  };
};

export const authErrorAction = () => {
  return {
    type: AUTH_ERROR,
  };
};
