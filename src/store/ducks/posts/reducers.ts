

import { IPost } from "../../../type/types"
import { ADD_POST, POSTS_FAILURE, DELETE_POST, GET_POSTS, SET_LOADING_POSTS } from "./actions"

export interface PostsState {
  isLoading: boolean
  posts: IPost[] | null
  error: any
}

const PostsInitialState: PostsState = {
  posts: null,
  isLoading: true,
  error: null
}

export const postsReducer = (state: PostsState = PostsInitialState, action: any) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload }
    case ADD_POST:
      return { ...state, posts: state.posts?.concat(action.payload) }
    case DELETE_POST:
      return { ...state, posts: state.posts?.filter(p => p.id !== action.payload) }
      case SET_LOADING_POSTS:
        return {...state, isLoading: action.payload}
        case POSTS_FAILURE:
      return {...state, isLoading:false, error:action.payload.error}
    default:
      return state
  }
}