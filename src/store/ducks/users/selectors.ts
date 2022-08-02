import { RootState } from './../../store';

export const getUsersState = (state:RootState) => {
    return state.users.users
}

export const getUsersLoading = (state:RootState) => {
    return state.users.isLoading
}