import {
  GET_ALL_FILES,
  GET_ALL_FILES_FAILURE,
  GET_ALL_FILES_SUCCESS,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_FAILURE,
  DOWNLOAD_FILE_SUCCESS,
} from './types';

export const getAllFiles = () => {
  return {
    type: GET_ALL_FILES,
  };
};
export const getAllFilesSuccess = (files) => {
  return {
    type: GET_ALL_FILES_SUCCESS,
    payload: files,
  };
};

export const getAllFilesFailure = (error) => {
  return {
    type: GET_ALL_FILES_FAILURE,
    payload: error,
  };
};

export const downloadFileAction = (id) => {
  return {
    type: DOWNLOAD_FILE,
    payload: id,
  };
};

export const downloadFileSuccess = (files) => {
  return {
    type: DOWNLOAD_FILE_SUCCESS,
    payload: files,
  };
};

export const downloadFileFailure = () => {
  return {
    type: DOWNLOAD_FILE_FAILURE,
  };
};
