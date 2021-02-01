/**
 * Auth Sagas
 */

import {all, call, put, takeEvery, select, delay} from 'redux-saga/effects';
import {GET_ALL_FILES, DOWNLOAD_FILE} from '../actions/types';
import {
  getAllFiles,
  downloadFileFailure,
  downloadFileSuccess,
  getAllFilesFailure,
  getAllFilesSuccess,
  authErrorAction,
} from '../actions/index';
import axios from 'axios';
import {AsyncStorage} from '../util/helpers/helpers';
// var fileDownload = require('js-file-download');
// var FileSaver = require('file-saver');

const user = (state) => state.files;

const getAllfilesCall = async () => {
  let url = `https://asia-south1-plathinkroneld.cloudfunctions.net/api/files`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.get(url, config);

  return result;
};

const downloadfilesCall = async (id) => {
  let url = `https://asia-south1-plathinkroneld.cloudfunctions.net/api/files/${id}/download`;
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    responseType: 'blob',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  console.log('url', url);
  let result = await axios.get(url, config);

  return result;
};

function* getFiles() {
  try {
    const response = yield call(getAllfilesCall);

    yield put(getAllFilesSuccess(response.data));
  } catch (error) {
    console.log('files error', error.response.status);
    // yield put(getAllFilesFailure(error));
    // if (
    //   error.response &&
    //   (error.response.status === 403 || error.response.status === 404)
    // ) {
    //   yield put(authErrorAction());
    // }
  }
}
const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

function* downloadFilefromServer() {
  try {
    let files = yield select(user);

    let id = files.fileId;
    let name = files.fileName;
    const response = yield call(downloadfilesCall, id);
    let res = yield blobToBase64(response.data);
    var result = res.substr(res.indexOf(',') + 1);

    yield put(downloadFileSuccess(result));
  } catch (error) {
    console.log('file downloaf error', error);
    yield put(downloadFileFailure(error));
    // if (
    //   error.response &&
    //   (error.response.status === 403 || error.response.status === 404)
    // ) {
    //   yield put(authErrorAction());
    // }
  }
}

export const filesSagas = [
  takeEvery(GET_ALL_FILES, getFiles),
  takeEvery(DOWNLOAD_FILE, downloadFilefromServer),
];

/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
  yield all([...filesSagas]);
}
