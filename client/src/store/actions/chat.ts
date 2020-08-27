export enum ChatTypes {
    SHOW_CHATTING_ROOM = "chat/SHOW_CHATTING_ROOM",
    HIDE_CHATTING_ROOM = "chat/HIDE_CHATTING_ROOM",
}

export interface ShowChattingRoomAction {
    type: ChatTypes.SHOW_CHATTING_ROOM;
}

export interface HideChattingRoomAction {
    type: ChatTypes.HIDE_CHATTING_ROOM;
}

export type ChatActionTypes = ShowChattingRoomAction
| HideChattingRoomAction


export const showChattingRoom = ():ShowChattingRoomAction => ({
    type: ChatTypes.SHOW_CHATTING_ROOM,
});
export const hideChattingRoom = (): HideChattingRoomAction => ({
    type: ChatTypes.HIDE_CHATTING_ROOM,
});

export const ChatActions = {
    showChattingRoom,
    hideChattingRoom
}