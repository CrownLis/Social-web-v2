import { RootState } from './../../store';

export const getPostsState = (state: RootState) => {
    return state.posts.posts
}

export const getPostsLoading = (state: RootState) => {
    return state.posts.isLoading
}