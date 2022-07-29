
import { IPost, IUser } from "../../../type/types";
import { GET_POSTS, SET_USER } from "./actions";


export interface ActiveUserState{
    activeUser: IUser | null;
    posts: IPost | null;
  }

const initialState: ActiveUserState = {
    activeUser: null,
    posts: null
}

export const activeUserReducer = (state:ActiveUserState= initialState,action:any) => {
    switch (action.type) {
          case SET_USER: 
          return {...state, activeUser: action.payload}
          case GET_POSTS: 
          return {...state,posts: action.payload}
        default:
        return state
    }
    }
