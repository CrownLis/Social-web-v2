import { getPosts, getUser } from './../../../API/socialWeb';
import { searchUsers, signUp } from '../../../API/socialWeb';
import { IPost, IUser } from '../../../type/types';
import { ADD_USER, GET_USERS, GET_USER_PROFILE, GET_USER_PROFILE_POSTS, SET_LOADING_USERS, SET_LOADING_USER_POSTS, SET_LOADING_USER_PROFILE, USERS_FAILURE } from './actions';

export const getUsers = (id: number, search?: string) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch(getUsersStarted(true))
      const response = await searchUsers(id, search)
      dispatch(getUsersSuccess(response.data))
    } catch (error) {
      dispatch(UsersFailure(error))
    }
    finally {
      dispatch(getUsersStarted(false))
    }
  }
};

export const getUserProfile = (id: number | string) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch(getUserProfileStarted(true))
      const response = await getUser(id)
      dispatch(getUserProfileSuccess(response.data))
    } catch (error) {
      dispatch(UsersFailure(error))
    }
    finally {
      dispatch(getUserProfileStarted(false))
    }
  }
};

export const getUserProfilePosts = (id: number) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch(getUserPostsStarted(true))
      const response = await getPosts(id)
      dispatch(getPostsProfilePosts(response.data))
    } catch (error) {
      dispatch(UsersFailure(error))
    }
    finally {
      dispatch(getUserPostsStarted(false))
    }
  }
};


export const addNewUsers = (values: { avatar: any; }) => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
    try {
      dispatch(getUsersStarted(true))
      const response = await signUp({
        ...values,
        avatar: values?.avatar || 'https://инобр.рф/upload/iblock/61f/no-avatar-8.png'
      })
      dispatch(addNewUser(response.data))
    } catch (error) {
      dispatch(UsersFailure(error))
    }
    finally {
      dispatch(getUsersStarted(false))
    }
  }
};


const getUsersStarted = (state: boolean) => ({
  type: SET_LOADING_USERS,
  payload:
    state

});


const getUserProfileStarted = (state: boolean) => ({
  type: SET_LOADING_USER_PROFILE,
  payload:
    state

});

const getUserPostsStarted = (state: boolean) => ({
  type: SET_LOADING_USER_POSTS,
  payload:
    state

});


const UsersFailure = (error: any) => ({
  type: USERS_FAILURE,
  payload: {
    error
  }
});

const getUserProfileSuccess = (users: IUser[]) => ({
  type: GET_USER_PROFILE,
  payload:
    users
});

const getUsersSuccess = (users: IUser[]) => ({
  type: GET_USERS,
  payload: [
    ...users
  ]
});

const getPostsProfilePosts = (posts: IPost[]) => ({
  type: GET_USER_PROFILE_POSTS,
  payload: [
    ...posts
  ]
});

const addNewUser = (user: IUser) => ({
  type: ADD_USER,
  payload:
    user
});