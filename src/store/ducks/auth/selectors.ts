import { RootState } from '../../store';

export const getAuth = (state:RootState) => {
return state.auth.activeUser
}

export const getAuthLoading = (state:RootState) => {
    return state.auth.isLoading
    }