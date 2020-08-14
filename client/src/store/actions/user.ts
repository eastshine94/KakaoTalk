import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto } from '~/types/profile';
export enum UserTypes {
    FETCH_USER_REQUEST= "user/FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS= "user/FETCH_USER_SUCCESS",
    FETCH_USER_FAILUER= "user/FETCH_USER_FAILUER",
    CHANGE_PROFILE = "user/CHANGE_PROFILE",
    ADD_FRIEND = "user/ADD_FRIEND",
    FETCH_FRIENDS_REQUEST= 'user/FETCH_FRIENDS_REQUEST',
    FETCH_FRIENDS_SUCCESS= 'user/FETCH_FRIENDS_SUCCESS',
    FETCH_FRIENDS_FAILUER= 'user/FETCH_FRIENDS_FAILUER',
    RESET_USER = 'user/RESET_USER',
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

export interface FetchFriendsAction {
    type: UserTypes.FETCH_FRIENDS_REQUEST,
    payload: number,
}

export interface FetchFriendsSuccessAction {
    type: UserTypes.FETCH_FRIENDS_SUCCESS,
    payload: Array<UserResponseDto>,    
}

export interface ResetUserAction {
    type: UserTypes.RESET_USER
}

export type UserActionTypes = FetchUserAction
| FetchUserSuccessAction
| FetchUserFailureAction
| ChangeProfileAction
| AddFriendAction
| FetchFriendsAction
| FetchFriendsSuccessAction
| ResetUserAction;

export const fetchUser = (userId: string) => ({
    type: UserTypes.FETCH_USER_REQUEST,
    payload: userId
});


export const addFriend = (friend: UserResponseDto) => ({
    type: UserTypes.ADD_FRIEND,
    payload: friend,
});

export const fetchFriends = (id: number) => ({
    type: UserTypes.FETCH_FRIENDS_REQUEST,
    payload: id
});

export const UserActions = {
    fetchUser,
    addFriend,
    fetchFriends
}