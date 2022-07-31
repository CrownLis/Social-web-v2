import { RootState } from './../../store';

export const getActiveUser = (state:RootState) => {
return state.auth.activeUser
}