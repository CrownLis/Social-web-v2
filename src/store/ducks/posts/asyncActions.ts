
import { ADD_POST, POSTS_FAILURE, DELETE_POST, GET_POSTS, SET_LOADING_POSTS } from "./actions";
import { getPosts, addPost, deletePost } from '../../../API/socialWeb';
import { IUser } from '../../../type/types';

export const getUserPosts = (user: IUser) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setPostsStarted(true))
            const response = await getPosts(user.id)
            dispatch(setPostsSuccess(response.data))
        } catch (error) {
            dispatch(setPostsFailure(error))  
        }
        finally {
            dispatch(setPostsStarted(false))
        }
    }
};

const setPostsStarted = (state:boolean) => ({
    type: SET_LOADING_POSTS,
    payload: 
        state
    
  });

  const setPostsFailure = (error: any) => ({
    type: POSTS_FAILURE,
    payload: {
      error
    }
  });

  const setPostsSuccess = (posts:any) => ({
    type: GET_POSTS,
    payload: [
      ...posts
    ]
  });

  const addPostSuccess = (post:any) => ({
    type: ADD_POST,
    payload:
      post
  });

  const deletePostSuccess = (id:number) => ({
    type: DELETE_POST,
    payload:
      id
  });

export const addNewPosts = (values:{}) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
        try {
            dispatch(setPostsStarted(true))
            const response = await addPost(values)
            dispatch(addPostSuccess(response.data))
        } catch (error) {
            dispatch(setPostsFailure(error))  
        }
        finally {
            dispatch(setPostsStarted(false))
        }
    }
};

export const deletePosts = (id:number) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
        try {
            dispatch(setPostsStarted(true))
            await deletePost(id)
            dispatch(deletePostSuccess(id))
        } catch (error) {
            dispatch(setPostsFailure(error))  
        }
        finally {
            dispatch(setPostsStarted(false))
        }
    }
};
