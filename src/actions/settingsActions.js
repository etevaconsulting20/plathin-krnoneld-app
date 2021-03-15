import {CHANGE_LANGUAGE,GET_USER_SETTINGS,GET_USER_SETTINGS_SUCCESS,USER_INFO,USER_INFO_SUCCESS,USER_INFO_FAILURE} from "./types";


export const changeLanguage=(languageCode)=>(
    {
        type:CHANGE_LANGUAGE,
        payload:languageCode
    }
)

export const getSettings=()=>(
    {
        type:GET_USER_SETTINGS,
        
    }
)
export const getSettingsSuccess=(settings)=>(
    {
        type:GET_USER_SETTINGS_SUCCESS,
        payload:settings
        
    }
)
