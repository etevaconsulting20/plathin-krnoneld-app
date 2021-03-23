/**
 * Auth Sagas
 */

import {all, call, put, takeEvery, select, delay} from 'redux-saga/effects';
import {
  NOTIFICATION,
  SEEN_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '../actions/types';

import {
  getAllNotificationsSuccess,
  getAllNotificationsFailure,
  getAllSeenNotificationsSuccess,
  getAllSeenNotificationsFailure,
  getDeleteNotificationSuccess,
  getDeleteNotificationFailure,
} from '../actions/index';
import axios from 'axios';
import {AsyncStorage} from '../util/helpers/helpers';

const user = (state) => state.files;

const getNotificationCall = async () => {
  let url = `https://asia-south1-plathinkroneld.cloudfunctions.net/api/notifications`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.get(url, config);

  return result;
};

function* getNotification() {
  try {
    const response = yield call(getNotificationCall);

    yield put(getAllNotificationsSuccess(response.data));
  } catch (error) {
    yield put(getAllNotificationsFailure());
  }
}

const getSeenNotificationCall = async (model) => {
  let url = `https://asia-south1-plathinkroneld.cloudfunctions.net/api/notifications/users/seen?id=${model}`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.put(url, '', config);

  return result;
};

function* getSeenNotification(model) {
  try {
    yield call(getSeenNotificationCall, model.payload);
    yield put(getAllSeenNotificationsSuccess());
  } catch (error) {
    yield put(getAllSeenNotificationsFailure());
    console.log('files error', error);
  }
}

const getDeleteCall = async (model) => {
  let url = `https://asia-south1-plathinkroneld.cloudfunctions.net/api/notifications/users/delete?id=${model}`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };

  let result = await axios.delete(url, config);

  return result;
};

function* getDelete(model) {
  try {
    debugger;
    const response = yield call(getDeleteCall, model.payload);

    yield put(getDeleteNotificationSuccess());
  } catch (error) {
    yield put(getDeleteNotificationFailure());
    console.log('delete error', error);
  }
}

export const notificationSaga = [
  takeEvery(NOTIFICATION, getNotification),
  takeEvery(SEEN_NOTIFICATION, getSeenNotification),
  takeEvery(DELETE_NOTIFICATION, getDelete),
];

/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
  yield all([...notificationSaga]);
}
