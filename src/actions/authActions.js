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
  FORGOT_PAASWORD,
  FORGOT_PAASWORD_FAILURE,
  FORGOT_PAASWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  USER_INFO,
  USER_INFO_FAILURE,
  USER_INFO_SUCCESS
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

export const forgotPassword = (model) => {
  return {
    type: FORGOT_PAASWORD,
    payload:model
  };
};
export const forgotPasswordSuccess = () => {
  return {
    type: FORGOT_PAASWORD_SUCCESS,
  };
};
export const forgotPasswordFailure = () => {
  return {
    type: FORGOT_PAASWORD_FAILURE,
  };
};

export const update = (model) => {
  return {
    type: UPDATE_USER,
    payload:model
  };
};
export const updateSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
  };
};
export const updateFailure = () => {
  return {
    type: UPDATE_USER_FAILURE,
  };
};

export const changePassword = (model) => {
  return {
    type: CHANGE_PASSWORD,
    payload:model
  };
};
export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
};
export const changePasswordFailure = () => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
  };
};

export const getUserInfo=()=>(
  {
      type:USER_INFO,
  }
)

export const getUserInfoSuccess=(data)=>(
  {
      type:USER_INFO_SUCCESS,
      payload:data
      
  }
)
export const getUserInfoFailure=()=>(
  {
      type:USER_INFO_FAILURE,
      
  }
)



