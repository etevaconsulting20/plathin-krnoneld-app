/**
 * Auth Sagas
 */
import {all, call, put, takeEvery, select, delay} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER,CHANGE_PASSWORD,FORGOT_PAASWORD,UPDATE_USER,USER_INFO} from '../actions/types';
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
  getUserInfoFailure
} from '../actions/index';
import axios from 'axios';
import {AsyncStorage, NotifyUser} from '../util/helpers/helpers';
import { updateLocale } from 'moment';

const user = (state) => state.authUser;

const loginUserCall = async (model) => {
   let url =
    'https://asia-south1-plathinkroneld.cloudfunctions.net/api/users/token';

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
const forgotpasswordCall = async (model) => {

  let url = "https://asia-south1-plathinkroneld.cloudfunctions.net/api/users/forgetpassword";
  let token = await AsyncStorage.getStringData('authToken');
  let config = {
    headers: {Authorization: 'Bearer ' + token},
  };
  let result = await axios.post(url,model, config)
 
  return result

}
const changepwdCall = async (model) => {

  let url = "https://asia-south1-plathinkroneld.cloudfunctions.net/api/users/confirmpassword";
  let token = await AsyncStorage.getStringData('authToken');
  let config = {

      headers: { 'Authorization': "Bearer " + token }
  }
  let result = await axios.put(url,model, config)
 
  return result

}

const updateCall=async(model)=>{
  let url = "https://asia-south1-plathinkroneld.cloudfunctions.net/api/users";
  let token = await AsyncStorage.getStringData('authToken');
  let config = {

      headers: { 'Authorization': "Bearer " + token }
  }
  let result = await axios.patch(url,model, config)
 
  return result
}
const userInfoCall=async()=>{
  let url = "https://asia-south1-plathinkroneld.cloudfunctions.net/api/users";
  let token = await AsyncStorage.getStringData('authToken');
  let config = {

      headers: { 'Authorization': "Bearer " + token }
  }
  let result = await axios.get(url,config)
 
  return result
}
function* loginUserToFb(model) {
  try {
   const response = yield call(loginUserCall, model.payload);
    yield delay(2000);
    yield put(loginUserSuccess(response.data));
  } catch (error) {
    yield put(loginUserFailure());
  }
}
function* logoutUserToFb() {
  try {
    yield call(logoutUserCall);

    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFailure());
  }
}
function* forgotpasswordToFb(model) {
  try {
      let resd=yield call(forgotpasswordCall,model.payload)
      yield put(forgotPasswordSuccess())

  } catch (error) {
      yield put(forgotPasswordFailure())
  }

}
function* changepwdToFb(model) {
  try {

     let res= yield call(changepwdCall,model.payload)
      yield put(changePasswordSuccess())

  } catch (error) {
      yield put(changePasswordFailure())
  }

}
function* updateToFb(model) {
  try {
    console.log("resssaass8888",model);

     let res= yield call(updateCall,model.payload)
     console.log("res8888",res);
     
      yield put(updateSuccess())

  } catch (error) {
    console.log("errrrrrrrrr",error);
    
      yield put(updateFailure())
  }

}
function* updateUserInfoCall() {
  try {
     let res= yield call(userInfoCall)
     console.log("calll");
     
      yield put(getUserInfoSuccess(res.data))

  } catch (error) {
    console.log("errrrrrrrrr",error);
    
      yield put(getUserInfoFailure())
  }

}
export const authenticationSagas = [
  takeEvery(LOGIN_USER, loginUserToFb),
  takeEvery(LOGOUT_USER, logoutUserToFb),
  takeEvery(FORGOT_PAASWORD,forgotpasswordToFb),
  takeEvery(CHANGE_PASSWORD,changepwdToFb),
  takeEvery(UPDATE_USER,updateToFb),
  takeEvery(USER_INFO,updateUserInfoCall)
];

/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
  yield all([...authenticationSagas]);
}
