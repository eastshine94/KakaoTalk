import { UserData } from '~/types/user';

export enum UserTypes {
    FETCH_USER= "user/FETCH_USER"
}

export interface FetchUserAction {
    type: typeof UserTypes.FETCH_USER;
    payload: UserData;
}

export type UserActionTypes = FetchUserAction;

export const fetchUser = (userData: UserData) => ({
    type: UserTypes.FETCH_USER,
    payload: userData
})

export const UserActions = {
    fetchUser,
}