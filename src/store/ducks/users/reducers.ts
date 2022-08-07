import { IPost } from './../../../type/types';



import { IUser } from "../../../type/types"
import { ADD_USER, GET_USERS, GET_USER_PROFILE, GET_USER_PROFILE_POSTS, SET_LOADING_USERS, SET_LOADING_USER_POSTS, SET_LOADING_USER_PROFILE, USERS_FAILURE } from "./actions"

export interface UsersState {
  isLoading: boolean
  isLoadingProfile: boolean
  isLoadingPosts: boolean
  users: IUser[] | null
  userProfile: IUser | null
  error: any
  posts: IPost[] | null
}

const PostsInitialState: UsersState = {
  users: [],
  userProfile: null,
  isLoading: true,
  isLoadingProfile: true,
  isLoadingPosts: true,
  error: null,
  posts: null,
}

export const usersReducer = (state: UsersState = PostsInitialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload }
    case ADD_USER:
      return { ...state, users: state.users?.concat(action.payload) }
    case SET_LOADING_USERS:
      return { ...state, isLoading: action.payload }
    case USERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error }
    case GET_USER_PROFILE:
      return { ...state, userProfile: action.payload }
    case SET_LOADING_USER_PROFILE:
      return { ...state, isLoadingProfile: action.payload }
    case GET_USER_PROFILE_POSTS:
      return { ...state, posts: action.payload }
    case SET_LOADING_USER_POSTS:
      return { ...state, isLoadingPosts: action.payload }
    default:
      return state
  }
}