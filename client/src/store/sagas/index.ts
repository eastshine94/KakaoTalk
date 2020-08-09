import {all, fork} from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
    ]);
}