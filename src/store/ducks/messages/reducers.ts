import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, SET_LOADING_MESSAGES, MESSAGES_FAILURE } from './actions';
import { IMessage } from "../../../type/types"

export interface MessagesState {
  messages: IMessage[] | null;
  isLoading: boolean
  error:any
}

const dialogsInitialState: MessagesState = {
  messages: null,
  isLoading:true,
  error:null
}

export const messagesReducer = (state: MessagesState = dialogsInitialState, action: any) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload }
    case ADD_MESSAGE:
      return { ...state, messages: state.messages?.concat(action.payload) }
    case DELETE_MESSAGE:
      return { ...state, messages: state.messages?.filter(p => p.id !== action.payload) }
      case SET_LOADING_MESSAGES:
        return {...state, isLoading: action.payload}
        case MESSAGES_FAILURE:
      return {...state, isLoading:false, error:action.payload.error}
    default:
      return state
  }
}