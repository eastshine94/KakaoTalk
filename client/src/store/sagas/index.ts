import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import profileSaga from './profile';
import chatSaga from './chat';
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(profileSaga),
    fork(chatSaga)
  ]);
}
