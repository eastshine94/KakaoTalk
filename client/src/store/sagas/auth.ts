import { all, put, call, takeLatest} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { AuthTypes, LoginAction } from '~/store/actions/auth';
import * as authApi from '~/apis/auth';
import {Auth} from '~/types/auth';


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
        const auth = jwtDecode(token) as Auth;
        yield put({
            type: AuthTypes.LOGIN_SUCCESS,
            payload: {
                token,
                auth
            }
        });
        yield window.sessionStorage.setItem('jwt', token);
    }
    catch{
        yield put({type: AuthTypes.LOGIN_FAILURE, payload: '계정 또는 비밀번호를 다시 확인해주세요.'});
    }
}

function* logout$() {
    yield call(authApi.logout);
}