/**
 * App Reducers
 */
import {combineReducers} from 'redux';

import authUserReducer from './authUserReducer';
import settingsReducer from './settingsReducer';
import filesReducer from './filesReducer';
import notificationReducer from './notificationReducer';

const reducers = combineReducers({
  authUser: authUserReducer,
  settings: settingsReducer,
  files: filesReducer,
  notification:notificationReducer
});

export default reducers;
