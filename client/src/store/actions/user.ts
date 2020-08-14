import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto } from '~/types/profile';
export enum UserTypes {
    FETCH_USER_REQUEST= "user/FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS= "user/FETCH_USER_SUCCESS",
    FETCH_USER_FAILUER= "user/FETCH_USER_FAILUER",
    CHANGE_PROFILE = "user/CHANGE_PROFILE",
    ADD_FRIEND = "friend/ADD_FRIEND",
}

export interface FetchUserAction {
    type: UserTypes.FETCH_USER_REQUEST;
    payload: string;
}
export interface FetchUserSuccessAction {
    type: UserTypes.FETCH_USER_SUCCESS;
    payload: UserResponseDto;
}
export interface FetchUserFailureAction {
    type: UserTypes.FETCH_USER_FAILUER;
    payload: string;
}
export interface ChangeProfileAction {
    type: UserTypes.CHANGE_PROFILE;
    payload: ProfileChangeRequestDto
}
export interface AddFriendAction {
    type: UserTypes.ADD_FRIEND,
    payload: UserResponseDto,
}

export type UserActionTypes = FetchUserAction
| FetchUserSuccessAction
| FetchUserFailureAction
| ChangeProfileAction
| AddFriendAction;

export const fetchUser = (userId: string) => ({
    type: UserTypes.FETCH_USER_REQUEST,
    payload: userId
})


export const addFriend = (friend: UserResponseDto) => ({
    type: UserTypes.ADD_FRIEND,
    payload: friend,
})

export const UserActions = {
    fetchUser,
    addFriend
}