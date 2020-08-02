import { all, put, call, takeLatest } from 'redux-saga/effects';
import {replace} from 'connected-react-router';
import * as authActionTypes from '~/store/actionTypes/auth';
import { LoginAction } from '~/store/reducers/auth';
import * as authApi from '~/apis/auth';
import { PAGE_PATHS } from '~/constants';

export default function* authSaga() {
    yield all([
        takeLatest(authActionTypes.LOGIN_REQUEST, login$),
    ])
}


function* login$(action: LoginAction){
    try{
        const loginData = action.payload;
        yield call(authApi.login, loginData);
        yield put({
            type: authActionTypes.LOGIN_SUCCESS,
            payload: '로그인에 성공하였습니다.'
        })
        yield put(replace(PAGE_PATHS.FRIENDS));
    }
    catch{
        yield put({type: authActionTypes.LOGIN_FAILURE, payload: '로그인에 실패하였습니다.'});
    }
}