import { UserData } from '~/types/user';

export enum UserTypes {
    FETCH_USER_REQUEST= "user/FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS= "user/FETCH_USER_SUCCESS",
    FETCH_USER_FAILUER= "user/FETCH_USER_FAILUER",
}

export interface FetchUserAction {
    type: typeof UserTypes.FETCH_USER_REQUEST;
    payload: string;
}
export interface FetchUserSuccessAction {
    type: typeof UserTypes.FETCH_USER_SUCCESS;
    payload: UserData;
}
export interface FetchUserFailureAction {
    type: typeof UserTypes.FETCH_USER_FAILUER;
    payload: string;
}

export type UserActionTypes = FetchUserAction
| FetchUserSuccessAction
| FetchUserFailureAction;

export const fetchUser = (userId: string) => ({
    type: UserTypes.FETCH_USER_REQUEST,
    payload: userId
})

export const UserActions = {
    fetchUser,
}