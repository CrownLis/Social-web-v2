import { GET_MESSAGES, SET_LOADING_MESSAGES, MESSAGES_FAILURE, ADD_MESSAGE, DELETE_MESSAGE } from './actions';

import { IMessage } from '../../../type/types'
import { deleteMessage, getMessages, postMessage } from '../../../API/socialWeb'

export const getConversationMessages = (id:any) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(setMessagesStarted(true))
            const response = await getMessages(id)
            console.log(response)
            dispatch(setMessagesSuccess(response.data))
        } catch (error) {
            dispatch(setMessagesFailure(error))  
        }
        finally {
            dispatch(setMessagesStarted(false))
        }
    }
};

const setMessagesStarted = (state:boolean) => ({
    type: SET_LOADING_MESSAGES,
    payload: 
        state
    
  });

  const setMessagesFailure = (error: any) => ({
    type: MESSAGES_FAILURE,
    payload: {
      error
    }
  });

  const setMessagesSuccess = (messages:any) => ({
    type: GET_MESSAGES,
    payload: [
      ...messages
    ]
  });

  const addMessageSuccess = (message:any) => ({
    type: ADD_MESSAGE,
    payload:
      message
  });

  const deleteMessageSuccess = (message:any) => ({
    type: DELETE_MESSAGE,
    payload:
      message
  });

  export const addNewMessage = (values:{text:string,conversationId:string}) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
        try {
            dispatch(setMessagesStarted(true))
            const response = await postMessage(values)
            dispatch(addMessageSuccess(response.data))
        } catch (error) {
            dispatch(setMessagesFailure(error))  
        }
        finally {
            dispatch(setMessagesStarted(false))
        }
    }
};

export const deleteMessages = (id:number) => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
      try {
          dispatch(setMessagesStarted(true))
          await deleteMessage(id)
          dispatch(deleteMessageSuccess(id))
      } catch (error) {
          dispatch(setMessagesFailure(error))  
      }
      finally {
          dispatch(setMessagesStarted(false))
      }
  }
};
