import { GET_CONVERSATIONS, ADD_CONVERSATION, GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE } from './actions';
import { IConversation, IMessage } from "../../../type/types"

export interface DialogsState {
  dialogs: IConversation[] | null
  messages: IMessage[] | null
}

const dialogsInitialState: DialogsState = {
  dialogs: null,
  messages: null
}

export const dialogsReducer = (state: DialogsState = dialogsInitialState, action: any) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, dialogs: action.payload }
    case ADD_CONVERSATION:
      return { ...state, dialogs: state.dialogs?.concat(action.payload) }
    case GET_MESSAGES:
      return { ...state, messages: action.payload }
    case ADD_MESSAGE:
      return { ...state, messages: state.messages?.concat(action.payload) }
    case DELETE_MESSAGE:
      return { ...state, messages: state.messages?.filter(p => p.id !== action.payload) }
    default:
      return state
  }
}