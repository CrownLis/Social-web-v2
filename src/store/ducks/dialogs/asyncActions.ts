import { addConversation, getConversations } from '../../../API/socialWeb';
import { SET_LOADING_CONVERSATIONS, CONVERSATIONS_FAILURE, GET_CONVERSATIONS, ADD_CONVERSATION } from './actions';


export const getUserConversations = () => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setConversationsStarted(true))
            const response = await getConversations()
            dispatch(setConversationsSuccess(response.data))
        } catch (error) {
            dispatch(setConversationsFailure(error))  
        }
        finally {
            dispatch(setConversationsStarted(false))
        }
    }
};


export const addUserConversations = (values: Record<string, any>) => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
      try {
          dispatch(setConversationsStarted(true))
          const response = await addConversation(values)
          dispatch(addConversations(response.data))
      } catch (error) {
          dispatch(setConversationsFailure(error))  
      }
      finally {
          dispatch(setConversationsStarted(false))
      }
  }
};

const setConversationsStarted = (state:boolean) => ({
    type: SET_LOADING_CONVERSATIONS,
    payload: 
        state
    
  });

  const setConversationsFailure = (error: any) => ({
    type: CONVERSATIONS_FAILURE,
    payload: {
      error
    }
  });

  const setConversationsSuccess = (conversations:any) => ({
    type: GET_CONVERSATIONS,
    payload: [
      ...conversations
    ]
  });

  const addConversations = (conversation:any) => ({
    type: ADD_CONVERSATION,
    payload:
    conversation
  });