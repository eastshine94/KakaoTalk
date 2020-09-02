import { CreateRoomRequest, ChattingDto, ChattingResponseDto, ChattingRequestDto } from '~/types/chatting';


export enum ChatTypes {
    SHOW_CHATTING_ROOM = "chat/SHOW_CHATTING_ROOM",
    HIDE_CHATTING_ROOM = "chat/HIDE_CHATTING_ROOM",
    FETCH_CHATTING_ROOM_INFO = "chat/FETCH_CHATTING_ROOM_INFO",
    ADD_CHATTING_REQUEST = "chat/ADD_CHATTING_REQUEST",
    ADD_CHATTING_SUCCESS = "chat/ADD_CHATTING_SUCCESS",
    ADD_CHATTING_FAILURE = "chat/ADD_CHATTING_FAILURE",
}

export interface ShowChattingRoomAction {
    type: ChatTypes.SHOW_CHATTING_ROOM;
    payload: CreateRoomRequest;
}

export interface HideChattingRoomAction {
    type: ChatTypes.HIDE_CHATTING_ROOM;
}

export interface FetchChattingRoomInfoAction {
    type: ChatTypes.FETCH_CHATTING_ROOM_INFO,
    payload: ChattingDto
}

export interface AddChattingAction {
    type: ChatTypes.ADD_CHATTING_REQUEST,
    payload: ChattingRequestDto
}

export interface AddChattingSuccessAction {
    type: ChatTypes.ADD_CHATTING_SUCCESS,
    payload: ChattingResponseDto
}

export type ChatActionTypes = ShowChattingRoomAction
| HideChattingRoomAction
| FetchChattingRoomInfoAction
| AddChattingAction
| AddChattingSuccessAction

export const showChattingRoom = (param: CreateRoomRequest):ShowChattingRoomAction => ({
    type: ChatTypes.SHOW_CHATTING_ROOM,
    payload: param,
});

export const hideChattingRoom = (): HideChattingRoomAction => ({
    type: ChatTypes.HIDE_CHATTING_ROOM,
});

export const fetchChattingRoomInfo = (param: ChattingDto): FetchChattingRoomInfoAction => ({
    type: ChatTypes.FETCH_CHATTING_ROOM_INFO,
    payload: param
})

export const addChatting = (chat: ChattingRequestDto): AddChattingAction => ({
    type: ChatTypes.ADD_CHATTING_REQUEST,
    payload: chat
});

export const ChatActions = {
    showChattingRoom,
    hideChattingRoom,
    fetchChattingRoomInfo,
    addChatting
}