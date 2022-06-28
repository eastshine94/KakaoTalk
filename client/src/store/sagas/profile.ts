import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ProfileTypes,
  ChangeProfileAction,
  ChangeFriendNameAction
} from '~/store/actions/profile';
import { changeProfile } from '~/apis/user';
import { UserTypes } from '~/store/actions/user';
import { changeFriendNameRequest } from '~/apis/friend';
export default function* profileSaga() {
  yield all([
    takeLatest(ProfileTypes.CHANGE_PROFILE_REQUEST, changeProfile$),
    takeLatest(ProfileTypes.CHANGE_FRIEND_NAME_REQUEST, changeFriendName$)
  ]);
}

function* changeProfile$(action: ChangeProfileAction) {
  const profileData = action.payload;
  try {
    yield call(changeProfile, profileData);
    yield put({
      type: ProfileTypes.CHANGE_PROFILE_SUCCESS,
      payload: profileData
    });
    yield put({
      type: UserTypes.CHANGE_PROFILE,
      payload: profileData
    });
  } catch (err) {
    yield put({
      type: ProfileTypes.CHANGE_PROFILE_FAILUER,
      payload: '프로필 변경 실패'
    });
  }
}

function* changeFriendName$(action: ChangeFriendNameAction) {
  const { friend_name } = action.payload;
  try {
    yield call(changeFriendNameRequest, action.payload);
    yield put({
      type: ProfileTypes.CHANGE_FRIEND_NAME_SUCCESS,
      payload: friend_name
    });
    yield put({
      type: UserTypes.CHANGE_FRIEND_NAME,
      payload: action.payload
    });
  } catch (err) {
    yield put({
      type: ProfileTypes.CHANGE_FRIEND_NAME_FAILUER,
      payload: '친구 이름 변경 실패'
    });
  }
}
