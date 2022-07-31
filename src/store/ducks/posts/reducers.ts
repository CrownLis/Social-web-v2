

import { IPost } from "../../../type/types"
import { ADD_POSTS, DELETE_POST, GET_POSTS } from "./actions"

export interface PostsState {
  posts: IPost[] | null
}

const PostsInitialState: PostsState = {
  posts: null
}

    export const postsReducer = (state:PostsState = PostsInitialState,action:any) => {
      switch (action.type) {
        case GET_POSTS:
          return {...state, posts:action.payload}
          case ADD_POSTS:
            return {...state,posts:state.posts?.concat(action.payload)}
            case DELETE_POST:
              return {...state,posts:state.posts?.filter(p => p.id !== action.payload)}
          default:
          return state
      } 
    }