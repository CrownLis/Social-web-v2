import { GET_CONVERSATIONS, ADD_CONVERSATION, SET_LOADING_CONVERSATIONS, CONVERSATIONS_FAILURE } from './actions';
import { IConversation } from "../../../type/types"

export interface DialogsState {
  dialogs: IConversation[] | null
  isLoading: boolean
  error:any
}

const dialogsInitialState: DialogsState = {
  dialogs: null,
  isLoading:true,
  error:null
}

export const dialogsReducer = (state: DialogsState = dialogsInitialState, action: any) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, dialogs: action.payload }
    case ADD_CONVERSATION:
      return { ...state, dialogs: state.dialogs?.concat(action.payload) }
      case SET_LOADING_CONVERSATIONS:
        return {...state, isLoading: action.payload}
        case CONVERSATIONS_FAILURE:
      return {...state, isLoading:false, error:action.payload.error}
    default:
      return state
  }
}