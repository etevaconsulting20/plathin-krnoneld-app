import {retry} from 'redux-saga/effects';
import {
 NOTIFICATION,NOTIFICATION_FAILURE,NOTIFICATION_SUCCESS,
 SEEN_NOTIFICATION_SUCCESS, 
 SEEN_NOTIFICATION,
 SEEN_NOTIFICATION_FAILURE,
 DELETE_NOTIFICATION,DELETE_NOTIFICATION_FAILURE,DELETE_NOTIFICATION_SUCCESS
} from '../actions/types';
import I18n from 'react-native-i18n';
const initState = {
  notification: [],
  loading: false,
 
};

import {NotifyUser, AsyncStorage} from '../util/helpers/helpers';

export default (state = initState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_SUCCESS: {
        // NotifyUser.success("Successfully");
      return {...state, loading: false, notification: action.payload};
    }

    case NOTIFICATION_FAILURE:
      NotifyUser.error("Something went wrong");
      //let error = action.payload;
      return {...state, loading: false};

      case SEEN_NOTIFICATION:
      return {
        ...state,
        loading: true,
        payload:action.payload
      };
    case SEEN_NOTIFICATION_SUCCESS: {
        // NotifyUser.success("Successfully");
      return {...state, loading: false};
    }

    case SEEN_NOTIFICATION_FAILURE:
      NotifyUser.error("Something went wrong");
      //let error = action.payload;
      return {...state, loading: false};

      case DELETE_NOTIFICATION:
      return {
        ...state,
        loading: true,
        payload:action.payload
      };
    case DELETE_NOTIFICATION_SUCCESS: {
       NotifyUser.success("Delete Notification Successfully");
      return {...state, loading: false};
    }

    case DELETE_NOTIFICATION_FAILURE:
      NotifyUser.error("Something went wrong");
      //let error = action.payload;
      return {...state, loading: false};

    default:
      return {...state};
  }
};
