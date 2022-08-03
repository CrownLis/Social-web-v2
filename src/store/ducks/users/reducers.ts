


import { IUser } from "../../../type/types"
import { ADD_USER, GET_USERS, SET_LOADING_USERS, USERS_FAILURE } from "./actions"

export interface UsersState {
  isLoading: boolean
  users: IUser[] | null
  error: any
  page:number
  limit:number
}

const PostsInitialState: UsersState = {
  users: [],
  isLoading: true,
  error: null,
  page:1,
  limit:10
}

export const usersReducer = (state: UsersState = PostsInitialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload }
    case ADD_USER:
      return { ...state, users: state.users?.concat(action.payload) }
      case SET_LOADING_USERS:
        return {...state, isLoading: action.payload}
        case USERS_FAILURE:
      return {...state, isLoading:false, error:action.payload.error}
    default:
      return state
  }
}