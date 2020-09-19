import { CreateRoomRequest, ChattingResponseDto, FetchChattingRequest, ChangeChattingRoomDto } from '~/types/chatting';

export enum ChatTypes {
    SHOW_CHATTING_ROOM = "chat/SHOW_CHATTING_ROOM",
    HIDE_CHATTING_ROOM = "chat/HIDE_CHATTING_ROOM",
    CHANGE_CHATTING_ROOM_INFO = "chat/CHANGE_CHATTING_ROOM_INFO",
    ADD_CHATTING = "chat/ADD_CHATTING",
    FETCH_CHATTING_REQUEST= 'chat/FETCH_CHATTING_REQUEST',
    FETCH_CHATTING_SUCCESS= 'chat/FETCH_CHATTING_SUCCESS',
    FETCH_CHATTING_FAILUER= 'chat/FETCH_CHATTING_FAILUER',
}

export interface ShowChattingRoomAction {
    type: ChatTypes.SHOW_CHATTING_ROOM;
    payload: CreateRoomRequest;
}

export interface HideChattingRoomAction {
    type: ChatTypes.HIDE_CHATTING_ROOM;
}

export interface ChangeChattingRoomInfoAction {
    type: ChatTypes.CHANGE_CHATTING_ROOM_INFO,
    payload: ChangeChattingRoomDto
}

export interface AddChattingAction {
    type: ChatTypes.ADD_CHATTING,
    payload: ChattingResponseDto
}

export interface FetchChattingAction {
    type: ChatTypes.FETCH_CHATTING_REQUEST;
    payload: FetchChattingRequest;
}

export interface FectchChattingSuccessAction {
    type: ChatTypes.FETCH_CHATTING_SUCCESS;
    payload: Array<ChattingResponseDto>;
}


export type ChatActionTypes = ShowChattingRoomAction
| HideChattingRoomAction
| ChangeChattingRoomInfoAction
| AddChattingAction
| FetchChattingAction
| FectchChattingSuccessAction


export const showChattingRoom = (param: CreateRoomRequest):ShowChattingRoomAction => ({
    type: ChatTypes.SHOW_CHATTING_ROOM,
    payload: param,
});

export const hideChattingRoom = (): HideChattingRoomAction => ({
    type: ChatTypes.HIDE_CHATTING_ROOM,
});

export const changeChattingRoomInfo = (param: ChangeChattingRoomDto): ChangeChattingRoomInfoAction => ({
    type: ChatTypes.CHANGE_CHATTING_ROOM_INFO,
    payload: param
})

export const addChatting = (chat: ChattingResponseDto): AddChattingAction => ({
    type: ChatTypes.ADD_CHATTING,
    payload: chat
});

export const fetchChatting = (param: FetchChattingRequest) => ({
    type: ChatTypes.FETCH_CHATTING_REQUEST,
    payload: param,
})


export const ChatActions = {
    showChattingRoom,
    hideChattingRoom,
    changeChattingRoomInfo,
    addChatting,
    fetchChatting,
}