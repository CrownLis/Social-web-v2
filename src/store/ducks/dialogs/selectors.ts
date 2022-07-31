import { RootState } from './../../store';

export const getConversationsState = (state:RootState) => {
    return state.dialogs?.dialogs
}

export const getDialogMessages = (state:RootState) => {
    return state.dialogs?.messages
}

