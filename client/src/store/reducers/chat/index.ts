import { ChatTypes, ChatActionTypes } from '~/store/actions/chat';
import { ChattingResponseDto } from '~/types/chatting';
import { UserResponseDto } from '~/types/user';

export interface ChatState {
    room_id: number,
    identifier: string,
    participant: Array<UserResponseDto>,
    chatting: Array<ChattingResponseDto>;
    isChattingRoomShown: boolean;
}

const initialState: ChatState = {
    room_id: -1,
    identifier: "",
    participant: [],
    chatting: [],
    isChattingRoomShown: false
}

const chatReducer = (state = initialState, action: ChatActionTypes ) => {
    switch(action.type){
        case ChatTypes.SHOW_CHATTING_ROOM : 
            return{
                ...state,
                isChattingRoomShown: true,
            };
        case ChatTypes.HIDE_CHATTING_ROOM :
            return {
                ...state,
                isChattingRoomShown: false
            };
        default:
            return state;
    }
}

export default chatReducer;