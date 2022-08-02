import { editUser, signIn } from "../../../API/socialWeb";
import { IUser } from "../../../type/types";
import { ACTIVE_USER_FAILURE, SET_ACTIVE_USER, SET_LOADING_ACTIVE_USER } from "./actions";


export const setActiveUser = (values:{} | null) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setActiveUserStarted(true))
            if (values !== null) {
            const response = await signIn(values)
            dispatch(setActiveUserSuccess(response.data))
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

const setActiveUserStarted = (state:boolean) => ({
    type: SET_LOADING_ACTIVE_USER,
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
    payload: {
      ...user
    }
  });

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