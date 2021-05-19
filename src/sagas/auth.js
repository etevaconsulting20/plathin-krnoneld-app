/**
 * Auth Sagas
 */
import {all, call, put, takeEvery, select, delay} from 'redux-saga/effects';
import {
  LOGIN_USER,
  LOGOUT_USER,
  CHANGE_PASSWORD,
  FORGOT_PAASWORD,
  UPDATE_USER,
  USER_INFO,
} from '../actions/types';
import {
  loginUserSuccess,
  loginUserFailure,
  logoutUserFailure,
  logoutUserSuccess,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  changePasswordSuccess,
  changePasswordFailure,
  updateFailure,
  updateSuccess,
  getUserInfoSuccess,
  getUserInfoFailure,
  authErrorAction
} from '../actions/index';
import axios from 'axios';
import {AsyncStorage, NotifyUser} from '../util/helpers/helpers';
import {updateLocale} from 'moment';
import {appConfig} from '../settings/settings';

const user = (state) => state.authUser;

const loginUserCall = async (model) => {
  let url =
    `${appConfig.apiPath}/users/token`;

  let result = await axios.post(url, model);

  return result;
};

const logoutUserCall = async () => {
  let url = `${appConfig.apiPath}/signout`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.post(url, '', config);

  return result;
};
const forgotpasswordCall = async (model) => {
  let url =
    `${appConfig.apiPath}/users/forgetpassword`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.post(url, model, config);

  return result;
};
const changepwdCall = async (model) => {
  let url =
    `${appConfig.apiPath}/users/confirmpassword`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.put(url, model, config);

  return result;
};

const updateCall = async (model) => {
  let url = `${appConfig.apiPath}/users`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.patch(url, model, config);

  return result;
};
const userInfoCall = async () => {
  let url = `${appConfig.apiPath}/users`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.get(url, config);

  return result;
};
function* loginUserToFb(model) {
  try {
    const response = yield call(loginUserCall, model.payload);
    yield delay(2000);
    yield put(loginUserSuccess(response.data));
  } catch (error) {
    yield put(loginUserFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
function* logoutUserToFb() {
  try {
    yield call(logoutUserCall);

    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
function* forgotpasswordToFb(model) {
  try {
    let resd = yield call(forgotpasswordCall, model.payload);
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
function* changepwdToFb(model) {
  try {
    let res = yield call(changepwdCall, model.payload);
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
function* updateToFb(model) {
  try {
    let res = yield call(updateCall, model.payload);

    yield put(updateSuccess());
  } catch (error) {
    yield put(updateFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
function* updateUserInfoCall() {
  try {
    let res = yield call(userInfoCall);
    yield put(getUserInfoSuccess(res.data));
  } catch (error) {
    yield put(getUserInfoFailure());
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      yield put(authErrorAction());
    }
  }
}
export const authenticationSagas = [
  takeEvery(LOGIN_USER, loginUserToFb),
  takeEvery(LOGOUT_USER, logoutUserToFb),
  takeEvery(FORGOT_PAASWORD, forgotpasswordToFb),
  takeEvery(CHANGE_PASSWORD, changepwdToFb),
  takeEvery(UPDATE_USER, updateToFb),
  takeEvery(USER_INFO, updateUserInfoCall),
];

/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
  yield all([...authenticationSagas]);
}
