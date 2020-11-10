import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto, ChangeFriendNameRequestDto } from '~/types/profile';
import { RoomListResponse, UpdateRoomListDto } from '~/types/chatting';

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
    UPDATE_ROOMLIST = 'user/UPDATE_ROOMLIST',
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
    payload: Array<RoomListResponse>
}

export interface UpdateRoomListAction {
    type: UserTypes.UPDATE_ROOMLIST;
    payload: UpdateRoomListDto
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
| UpdateRoomListAction
| ChangeProfileAction
| ChangeFriendNameAction
| AddFriendAction
| ResetUserAction;

// 로그인 시, 해당 유저의 정보를 가져옴
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

// 안 읽은 채팅 수, 마지막 채팅 등 채팅 목록의 방 정보를 변경합니다.
export const updateRoomList = (param: UpdateRoomListDto) => ({
    type: UserTypes.UPDATE_ROOMLIST,
    payload: param
})


export const UserActions = {
    fetchUser,
    addFriend,
    fetchFriends,
    fetchRoomList,
    updateRoomList
}