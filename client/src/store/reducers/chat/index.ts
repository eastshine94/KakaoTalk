import { ChatTypes, ChatActionTypes } from '~/store/actions/chat';
import { ChattingDto } from '~/types/chatting';

export interface ChatState extends ChattingDto {
    isChattingRoomShown: boolean;
}

const initialState: ChatState = {
    room_id: -1,
    type: undefined,
    identifier: "",
    room_name: "",
    participant: [],
    chatting: [],
    isChattingRoomShown: false
}

const chatReducer = (state = initialState, action: ChatActionTypes ) => {
    switch(action.type){
        case ChatTypes.SHOW_CHATTING_ROOM : 
            return{
                ...state,
                ...action.payload,
                isChattingRoomShown: true,
            };
        case ChatTypes.HIDE_CHATTING_ROOM :
            return {
                ...state,
                room_id: -1,
                type: undefined,
                identifier: "",
                participant: [],
                chatting: [],
                isChattingRoomShown: false
            };
        case ChatTypes.ADD_CHATTING_SUCCESS :
            return {
                ...state,
                chatting: [
                    ...state.chatting,
                    action.payload
                ]
            }
        default:
            return state;
    }
}

export default chatReducer;