import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_STATE,
  LOGOUT_USER,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  CHECK_AUTH_STATUS,
  CHECK_AUTH_STATUS_SUCCESS,
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
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE
} from '../actions/types';

const initState = {
  email: '',
  password: '',
  isLoggedIn: false,
  loading: false,
  user: null,
  authError: false,
  userInfo:null
};
import {AsyncStorage, NotifyUser} from '../util/helpers/helpers';
import I18n from 'react-native-i18n';

export default (state = initState, action) => {
  switch (action.type) {
    case CHECK_AUTH_STATUS:
      return {...state, loading: true};
    case CHECK_AUTH_STATUS_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          loading: false,
          authToken: action.payload.token,
          isLoggedIn: true,
        };
      }
      return {...state, loading: false, isLoggedIn: false};
    case LOGIN_USER:
      return {
        ...state,
        payload:action.payload,
       // password: action.payload.password,
        loading: true,
        authError: false,
      };
    case LOGIN_USER_SUCCESS: {
      let token = action.payload.token;
      let email = action.payload.email;

      AsyncStorage.storeObjectData("profileData",action.payload)
      AsyncStorage.storeStringData('authToken', token);
      return {...state, loading: false, isLoggedIn: true};
    }

    case LOGIN_USER_FAILURE:
      NotifyUser.error(I18n.t('notification-networkerror'));
      return {...state, loading: false};

    case LOGOUT_USER:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case LOGOUT_USER_SUCCESS: {
      // localStorage.setItem('token',null);
      // localStorage.setItem('email',null)
      AsyncStorage.remove('authToken');

      return {...state, loading: false, isLoggedIn: false};
    }

    case LOGOUT_USER_FAILURE:
      return {...state, loading: false};
    case AUTH_ERROR:
      AsyncStorage.remove('authToken');
      return {...state, loading: false, authError: true, isLoggedIn: false};

case FORGOT_PAASWORD:
  return {
    ...state,
    loading: true,
    email: action.payload,
  };
case FORGOT_PAASWORD_SUCCESS: {
  return {...state, loading: false, isLoggedIn: false};
}

case FORGOT_PAASWORD_FAILURE:
  return {...state, loading: false};

  case UPDATE_USER:
  return {
    ...state,
    loading: true,
    payload: action.payload,
  };
case UPDATE_USER_SUCCESS: {
  NotifyUser.success(I18n.t('notification_dataUpdate'));
  return {...state, loading: false};
}

case UPDATE_USER_FAILURE:
  NotifyUser.error(I18n.t('notification_dataError'));
  return {...state, loading: false};
////////////////////////////////////////////////////

case CHANGE_PASSWORD:
  return {
    ...state,
    loading: true,
    email: action.payload,
  };
case CHANGE_PASSWORD_SUCCESS: {
  return {...state, loading: false, isLoggedIn: false};
}

case CHANGE_PASSWORD_FAILURE:
  return {...state, loading: false};

  case USER_INFO:
         return   {...state,loading:true}
        case USER_INFO_SUCCESS:{
           AsyncStorage.storeObjectData("profileData",action.payload)
            //NotifyUser.success(I18n.t('notification_dataUpdate'));

            return { ...state,loading:false,userInfo:action.payload}
        }
        case USER_INFO_FAILURE:{
            NotifyUser.error(I18n.t('notification_dataError'));

            return { ...state,loading:false}
        }

case AUTH_ERROR:
  return {...state, loading: false, isLoggedIn: false};
    default:
      return {...state};
  }
};
