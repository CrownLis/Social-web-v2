import { RootState } from './../../store';

export const getActiveUser = (state:RootState) => {
return state.auth.activeUser
}

export const getActiveUserPosts = (state:RootState) => {
 return state.auth.posts   
}