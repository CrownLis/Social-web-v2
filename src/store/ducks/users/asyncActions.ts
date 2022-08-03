import { searchUsers, signUp } from '../../../API/socialWeb';
import { IUser } from '../../../type/types';
import { ADD_USER, GET_USERS, SET_LOADING_USERS, USERS_FAILURE } from './actions';

export const getUsers = (user: IUser,page:number,limit:number,search?:string) => {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        try {
            dispatch(getUsersStarted(true))
            const response = await searchUsers(user.id,page,limit,search)
            dispatch(getUsersSuccess(response.data.data))
        } catch (error) {
            dispatch(UsersFailure(error))  
        }
        finally {
            dispatch(getUsersStarted(false))
        }
    }
};

const getUsersStarted = (state:boolean) => ({
    type: SET_LOADING_USERS,
    payload: 
        state
    
  });

  const UsersFailure = (error: any) => ({
    type: USERS_FAILURE,
    payload: {
      error
    }
  });

  const getUsersSuccess = (users:IUser[]) => ({
    type: GET_USERS,
    payload: [
      ...users
    ]
  });

  const addNewUser = (user:IUser) => ({
    type: ADD_USER,
    payload:
      user
  });


export const addNewUsers = (values: { avatar: any; }) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => any) => {
        try {
            dispatch(getUsersStarted(true))
            const response = await signUp({
                ...values,
              avatar: values?.avatar || 'https://инобр.рф/upload/iblock/61f/no-avatar-8.png'})
            dispatch(addNewUser(response.data))
        } catch (error) {
            dispatch(UsersFailure(error))  
        }
        finally {
            dispatch(getUsersStarted(false))
        }
    }
};
