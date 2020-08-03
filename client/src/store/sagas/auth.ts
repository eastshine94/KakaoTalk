import { all, put, call, takeLatest } from 'redux-saga/effects';
import { AuthTypes, LoginAction } from '~/store/actions/auth';
import { UserTypes } from '~/store/actions/user';
import * as authApi from '~/apis/auth';


export default function* authSaga() {
    yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST, login$),
        takeLatest(AuthTypes.LOGOUT, logout$),
    ])
}

function* login$(action: LoginAction){
    try{
        const loginData = action.payload;
        const token = yield call(authApi.login, loginData);
        yield put({
            type: AuthTypes.LOGIN_SUCCESS,
            payload: token,
        })
        yield put({
            type: UserTypes.FETCH_USER,
            payload: JSON.parse(token),
        })
        
    }
    catch{
        yield put({type: AuthTypes.LOGIN_FAILURE, payload: '로그인에 실패하였습니다.'});
    }
}

function* logout$() {
    yield call(authApi.logout);
}