import { RootState } from './../../store';

export const getPostsState = (state:RootState) => {
    return state.posts.posts
}