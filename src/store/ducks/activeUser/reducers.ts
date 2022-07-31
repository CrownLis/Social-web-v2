
import { IPost, IUser } from "../../../type/types";
import { SET_USER } from "./actions";


export interface ActiveUserState{
    activeUser: IUser | null;
    posts: IPost | null;
  }

const authInitialState: ActiveUserState = {
    activeUser: null,
    posts: null
}

export const authReducer = (state:ActiveUserState= authInitialState,action:any) => {
    switch (action.type) {
          case SET_USER: 
          return {...state, activeUser: action.payload}
        default:
        return state
    }
    }