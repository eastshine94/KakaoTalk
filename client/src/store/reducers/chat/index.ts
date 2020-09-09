import { ChatTypes, ChatActionTypes } from '~/store/actions/chat';
import { ChattingDto } from '~/types/chatting';

export interface ChatState extends ChattingDto {
    isChattingRoomShown: boolean;
    isFetchChattingLoading: boolean;
}

const initialState: ChatState = {
    room_id: -1,
    type: undefined,
    identifier: "",
    room_name: "",
    participant: [],
    chatting: [],
    isChattingRoomShown: false,
    isFetchChattingLoading: false
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
                isChattingRoomShown: false,
                isFetchChattingLoading: false
            };
        case ChatTypes.FETCH_CHATTING_ROOM_INFO :
            return {
                ...state,
                ...action.payload
            }
        case ChatTypes.ADD_CHATTING :
            return {
                ...state,
                chatting: [
                    ...state.chatting,
                    action.payload
                ]
            }
        case ChatTypes.FETCH_CHATTING_REQUEST :
            return {
                ...state,
                isFetchChattingLoading: true,
            }
        case ChatTypes.FETCH_CHATTING_SUCCESS :
            if(action.payload.length === 0){
                return {
                    ...state,
                    isFetchChattingLoading: true,
                }
            }
            return {
                ...state,
                chatting: [
                    ...action.payload,
                    ...state.chatting,
                ],
                isFetchChattingLoading: false,
            }
        default:
            return state;
    }
}

export default chatReducer;