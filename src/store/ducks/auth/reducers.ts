
import { IUser } from "../../../type/types";
import { ACTIVE_USER_FAILURE, SET_ACTIVE_USER, SET_LOADING_ACTIVE_USER, SET_LOADING_CHECK } from "./actions";


export interface AuthState {
  activeUser: IUser | null;
  error: any
  isLoading: boolean
  isLoadingAuth: boolean
}

const authInitialState: AuthState = {
  activeUser: null,
  error: null,
  isLoading: true,
  isLoadingAuth: true,

}

export const authReducer = (state: AuthState = authInitialState, action: any) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return { ...state, activeUser: action.payload }
    case ACTIVE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error }
    case SET_LOADING_ACTIVE_USER:
      return { ...state, isLoading: action.payload }
    case SET_LOADING_CHECK:
      return { ...state, isLoadingAuth: action.payload }
    default:
      return state
  }
}