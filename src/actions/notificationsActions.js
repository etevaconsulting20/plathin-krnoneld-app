import {
    NOTIFICATION,
    NOTIFICATION_FAILURE,
    NOTIFICATION_SUCCESS ,
    SEEN_NOTIFICATION_SUCCESS,
    SEEN_NOTIFICATION_FAILURE,
    SEEN_NOTIFICATION,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE,
    DELETE_NOTIFICATION,
  } from './types';
  
  export const getAllNotifications = () => {
    return {
      type: NOTIFICATION,
    };
  };
  export const getAllNotificationsSuccess = (files) => {
    return {
      type: NOTIFICATION_SUCCESS,
      payload: files,
    };
  };
  
  export const getAllNotificationsFailure = (error) => {
    return {
      type: NOTIFICATION_FAILURE,
      payload: error,
    };
  };
  
  export const getAllSeenNotifications = (model) => {
    return {
      type: SEEN_NOTIFICATION,
      payload:model
    };
  };
  export const getAllSeenNotificationsSuccess = (updateFile) => {
    return {
      type: SEEN_NOTIFICATION_SUCCESS,
      payload:updateFile
      
    };
  };
  
  export const getAllSeenNotificationsFailure = (error) => {
    return {
      type: SEEN_NOTIFICATION_FAILURE,
      payload: error,
    };
  };

  export const getDeleteNotification = (model) => {
    return {
      type: DELETE_NOTIFICATION,
      payload:model
    };
  };
  export const getDeleteNotificationSuccess = (updateFile) => {
    return {
      type: DELETE_NOTIFICATION_SUCCESS,
      payload:updateFile
      
    };
  };
  
  export const getDeleteNotificationFailure = (error) => {
    return {
      type: DELETE_NOTIFICATION_FAILURE,
      payload: error,
    };
  };
  
  