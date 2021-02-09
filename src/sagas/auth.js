/**
 * Auth Sagas
 */
import {all, call, put, takeEvery, select, delay} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER} from '../actions/types';
import {
  loginUserSuccess,
  loginUserFailure,
  logoutUserFailure,
  logoutUserSuccess,
} from '../actions/index';
import axios from 'axios';
import {AsyncStorage, NotifyUser} from '../util/helpers/helpers';

const user = (state) => state.authUser;

const loginUserCall = async (model) => {
   let url =
    'https://asia-south1-plathinkroneld.cloudfunctions.net/api/users/token';
  // let config = {
  //     headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Content-type': 'application/json',
  //     },
  // }
  let result = await axios.post(url, model);

  return result;
};

const logoutUserCall = async () => {
  let url = 'https://asia-south1-plathinkroneld.cloudfunctions.net/api/signout';
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.post(url, '', config);

  return result;
};

function* loginUserToFb(model) {
  try {
   const response = yield call(loginUserCall, model.payload);
console.log("YYYYYYYYYYYYY",response)
    yield delay(2000);
    yield put(loginUserSuccess(response.data));
  } catch (error) {
    console.log("errorerrorerrorerrorerror",error)
    yield put(loginUserFailure());
  }
}
function* logoutUserToFb() {
  try {
    yield call(logoutUserCall);

    yield put(logoutUserSuccess());
  } catch (error) {
    console.log('logout erro', error);
    yield put(logoutUserFailure());
  }
}

export const authenticationSagas = [
  takeEvery(LOGIN_USER, loginUserToFb),
  takeEvery(LOGOUT_USER, logoutUserToFb),
];

/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
  yield all([...authenticationSagas]);
}
