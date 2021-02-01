/**
 * App Reducers
 */
import {combineReducers} from 'redux';

import authUserReducer from './authUserReducer';
import settingsReducer from './settingsReducer';
import filesReducer from './filesReducer';

const reducers = combineReducers({
  authUser: authUserReducer,
  settings: settingsReducer,
  files: filesReducer,
});

export default reducers;
