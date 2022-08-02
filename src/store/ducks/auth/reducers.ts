
import { IUser } from "../../../type/types";
import { SET_ACTIVE_USER } from "./actions";


export interface AuthState{
    activeUser: IUser | null;
    error:any
    isLoading:boolean
  }

const authInitialState: AuthState = {
    activeUser: null,
    error:null,
    isLoading:true
}

export const authReducer = (state:AuthState= authInitialState,action:any) => {
    switch (action.type) {
          case SET_ACTIVE_USER: 
          return {...state, activeUser: action.payload}
        default:
        return state
    }
    }