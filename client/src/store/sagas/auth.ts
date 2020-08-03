import { all, put, call, takeLatest } from 'redux-saga/effects';
import { AuthTypes } from '~/store/actions/auth';
import { LoginAction } from '~/store/actions/auth';
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
    }
    catch{
        yield put({type: AuthTypes.LOGIN_FAILURE, payload: '로그인에 실패하였습니다.'});
    }
}

function* logout$() {
    yield call(authApi.logout);
}