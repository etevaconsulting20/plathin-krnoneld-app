import {retry} from 'redux-saga/effects';
import {
  GET_ALL_FILES,
  GET_ALL_FILES_FAILURE,
  GET_ALL_FILES_SUCCESS,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_FAILURE,
  DOWNLOAD_FILE_SUCCESS,
} from '../actions/types';
import I18n from 'react-native-i18n';
const initState = {
  files: [],
  loading: false,
  fileId: null,
  fileName: null,
  fileBase64: null,
  authError: false,
};

import {NotifyUser, AsyncStorage} from '../util/helpers/helpers';

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_FILES:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_FILES_SUCCESS: {
      return {...state, loading: false, files: action.payload};
    }

    case GET_ALL_FILES_FAILURE:
      NotifyUser.error(I18n.t('notification-networkerror'));
      let error = action.payload;
      return {...state, loading: false};
    case DOWNLOAD_FILE: {
 // NotifyUser.error(I18n.t('notification_dataError'));

      return {
        ...state,
        loading: true,
        fileId: action.payload.id,
        fileName: action.payload.name,
      };
    }
    case DOWNLOAD_FILE_SUCCESS:
      return {...state, loading: false, fileBase64: action.payload};
    case DOWNLOAD_FILE_FAILURE:
      return {...state, loading: false, fileBase64: null};
    default:
      return {...state};
  }
};
