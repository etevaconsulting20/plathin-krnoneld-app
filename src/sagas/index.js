/**
 * Root Sagas
 */
import {all} from 'redux-saga/effects';

// sagas
import authSagas from './auth';
import localAsync from './localAsync';
import filesSaga from './files';

export default function* rootSaga(getState) {
  yield all([authSagas(), localAsync(), filesSaga()]);
}
