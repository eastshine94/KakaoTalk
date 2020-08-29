import {all, put, takeLatest} from 'redux-saga/effects';
import { ChatTypes ,AddChattingAction } from '~/store/actions/chat';
export default function* chatSaga() {
    yield all([
        takeLatest(ChatTypes.ADD_CHATTING_REQUEST, addChatting$),
    ])
}

function* addChatting$(action: AddChattingAction) {
    try{
        yield put({
            type: ChatTypes.ADD_CHATTING_SUCCESS,
            payload: {
                id: 1,
                ...action.payload
            }
        });
    }catch(err){
        yield put({
            type: ChatTypes.ADD_CHATTING_FAILURE,
            payload: "채팅이 서버에 전송되지 않았습니다."
        })
    }
    
};