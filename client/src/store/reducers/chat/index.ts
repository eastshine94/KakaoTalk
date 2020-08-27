import { ChatTypes, ChatActionTypes } from '~/store/actions/chat';

export interface ChatState {
    isChattingRoomShown: boolean;
}

const initialState: ChatState = {
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