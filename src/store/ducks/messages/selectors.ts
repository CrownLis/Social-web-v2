import { RootState } from '../../store';

export const getDialogMessages = (state:RootState) => {
    return state.messages.messages
}

export const getMessagesLoading = (state:RootState) => {
    return state.messages.isLoading
}
