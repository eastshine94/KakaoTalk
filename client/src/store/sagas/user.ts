import { all, put, call, takeLatest} from 'redux-saga/effects';
import { UserTypes, FetchUserAction } from '~/store/actions/user';
import * as api from '~/apis/user';

export default function* userSaga() {
    yield all([
        takeLatest(UserTypes.FETCH_USER_REQUEST, fetchUser$),
    ])
}

function* fetchUser$(action: FetchUserAction){
    try{
        const userId = action.payload;
        const user = yield call(api.fetchUser, userId);
        yield put({
            type: UserTypes.FETCH_USER_SUCCESS,
            payload: user,
        })
    }
    catch{
        yield put({type: UserTypes.FETCH_USER_FAILUER, payload: '유저 정보를 불러오지 못했습니다.'});
    }
}
