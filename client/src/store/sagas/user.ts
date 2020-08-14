import { all, put, call, takeLatest} from 'redux-saga/effects';
import { UserTypes, FetchUserAction, FetchFriendsAction } from '~/store/actions/user';
import * as userApi from '~/apis/user';
import * as friendApi from '~/apis/friend';


export default function* userSaga() {
    yield all([
        takeLatest(UserTypes.FETCH_USER_REQUEST, fetchUser$),
        takeLatest(UserTypes.FETCH_FRIENDS_REQUEST, fetchFriends$),
    ])
}

function* fetchUser$(action: FetchUserAction){
    try{
        const userId = action.payload;
        const user = yield call(userApi.findUser, userId);
        yield put({
            type: UserTypes.FETCH_USER_SUCCESS,
            payload: user,
        })
    }
    catch{
        yield put({type: UserTypes.FETCH_USER_FAILUER, payload: '유저 정보를 불러오지 못했습니다.'});
    }
}

function* fetchFriends$(action: FetchFriendsAction) {
    try{
        const id = action.payload;
        const friends = yield call(friendApi.fecthFriendsRequest, id);
        yield put({
            type: UserTypes.FETCH_FRIENDS_SUCCESS,
            payload: friends
        })
    }
    catch{
        yield put({type: UserTypes.FETCH_FRIENDS_FAILUER, payload: "친구 목록을 불러오지 못했습니다."})
    }
}