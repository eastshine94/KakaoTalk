import { put, all, call, takeLatest } from 'redux-saga/effects';
import { ChatTypes, FetchChattingAction } from '~/store/actions/chat';
import * as chatApi from '~/apis/chat';
export default function* chatSaga() {
    yield all([
        takeLatest(ChatTypes.FETCH_CHATTING_REQUEST, $fetchChatting),
    ])    
}

function* $fetchChatting(action: FetchChattingAction){
    try {
        const chatting = yield call(chatApi.fetchChatting, action.payload);
        yield put({
            type: ChatTypes.FETCH_CHATTING_SUCCESS,
            payload: chatting
        })
    } catch (err) {
        yield put({
            type: ChatTypes.FETCH_CHATTING_FAILUER,
            payload: "채팅 목록을 불러오지 못했습니다."
        })
    }
}
