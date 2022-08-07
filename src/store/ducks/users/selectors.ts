import { RootState } from './../../store';

export const getUsersState = (state: RootState) => {
    return state.users.users
}

export const getUsersLoading = (state: RootState) => {
    return state.users.isLoading
}

export const getUserProfiles = (state: RootState) => {
    return state.users.userProfile
}

export const getLoadingProfile = (state: RootState) => {
    return state.users.isLoadingProfile
}

export const getProfilePosts = (state: RootState) => {
    return state.users.posts
}

export const getLoadingPosts = (state: RootState) => {
    return state.users.isLoadingPosts
}