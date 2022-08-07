import { authMe } from './../../../API/socialWeb';
import { editUser, signIn } from "../../../API/socialWeb";
import { IUser } from "../../../type/types";
import { ACTIVE_USER_FAILURE, CHECK_ACTIVE_USER, SET_ACTIVE_USER, SET_LOADING_ACTIVE_USER, SET_LOADING_CHECK } from "./actions";


export const setActiveUser = (values:{} | null) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setActiveUserStarted(true))
            if (values !== null) {
            const response = await signIn(values)
            dispatch(setActiveUserSuccess(response.data.user))
            } else {
              dispatch(setActiveUserSuccess(null))
            }
        } catch (error) {
            dispatch(activeUserFailure(error))  
        }
        finally {
            dispatch(setActiveUserStarted(false))
        }
    }
};


export const editActiveUser = (values:{}) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setActiveUserStarted(true))
            const response = await editUser(values)
            dispatch(setActiveUserSuccess(response.data))
        } catch (error) {
            dispatch(activeUserFailure(error))
        }
        finally {
            dispatch(setActiveUserStarted(false))
        }
    }
};

export const checkAuth = () => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setIsAuthStarted(false))
            const response = await authMe()
            dispatch(setActiveUserSuccess(response?.data))
        } catch (error) {
            dispatch(activeUserFailure(error))  
            setActiveUserSuccess(null)  
        }
        finally {
            dispatch(setIsAuthStarted(false))
        }
    }
};

const setActiveUserStarted = (state:boolean) => ({
    type: SET_LOADING_CHECK,
    payload: 
        state
  });

  const setIsAuthStarted = (state:boolean) => ({
    type: SET_LOADING_CHECK,
    payload: 
        state
  });


  const activeUserFailure = (error: any) => ({
    type: ACTIVE_USER_FAILURE,
    payload: {
      error
    }
  });

  const setActiveUserSuccess = (user:IUser | null) => ({
    type: SET_ACTIVE_USER,
    payload: 
    user
  });
