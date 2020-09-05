import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto, ChangeFriendNameRequestDto } from '~/types/profile';
import { RoomListDto } from '~/types/chatting';

export enum UserTypes {
    FETCH_USER_REQUEST= "user/FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS= "user/FETCH_USER_SUCCESS",
    FETCH_USER_FAILUER= "user/FETCH_USER_FAILUER",
    FETCH_FRIENDS_REQUEST= 'user/FETCH_FRIENDS_REQUEST',
    FETCH_FRIENDS_SUCCESS= 'user/FETCH_FRIENDS_SUCCESS',
    FETCH_FRIENDS_FAILUER= 'user/FETCH_FRIENDS_FAILUER',
    FETCH_ROOMLIST_REQUEST= 'user/FETCH_ROOMLIST_REQUEST',
    FETCH_ROOMLIST_SUCCESS= 'user/FETCH_ROOMLIST_SUCCESS',
    FETCH_ROOMLIST_FAILUER= 'user/FETCH_ROOMLIST_FAILUER',
    CHANGE_PROFILE = "user/CHANGE_PROFILE",
    ADD_FRIEND = "user/ADD_FRIEND",
    CHANGE_FRIEND_NAME = "user/CHANGE_FRIEND_NAME",
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

export interface FetchFriendsAction {
    type: UserTypes.FETCH_FRIENDS_REQUEST;
    payload: number;
}

export interface FetchFriendsSuccessAction {
    type: UserTypes.FETCH_FRIENDS_SUCCESS;
    payload: Array<UserResponseDto>;
}

export interface FetchRoomListAction {
    type: UserTypes.FETCH_ROOMLIST_REQUEST;
    payload: number;
}

export interface FetchRoomListSuccesssAction {
    type: UserTypes.FETCH_ROOMLIST_SUCCESS;
    payload: Array<RoomListDto>
}

export interface ChangeProfileAction {
    type: UserTypes.CHANGE_PROFILE;
    payload: ProfileChangeRequestDto;
}

export interface ChangeFriendNameAction {
    type: UserTypes.CHANGE_FRIEND_NAME;
    payload: ChangeFriendNameRequestDto;
}

export interface AddFriendAction {
    type: UserTypes.ADD_FRIEND;
    payload: UserResponseDto;
}

export interface ResetUserAction {
    type: UserTypes.RESET_USER;
}

export type UserActionTypes = FetchUserAction
| FetchUserSuccessAction
| FetchUserFailureAction
| FetchFriendsAction
| FetchFriendsSuccessAction
| FetchRoomListAction
| FetchRoomListSuccesssAction
| ChangeProfileAction
| ChangeFriendNameAction
| AddFriendAction
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

export const fetchRoomList = (id: number) => ({
    type: UserTypes.FETCH_ROOMLIST_REQUEST,
    payload: id
})


export const UserActions = {
    fetchUser,
    addFriend,
    fetchFriends,
    fetchRoomList
}