import { RootState } from './../../store';

export const getConversationsState = (state:RootState) => {
    return state.dialogs?.dialogs
}

export const getConversationsLoading = (state:RootState) => {
    return state.dialogs?.isLoading
}
