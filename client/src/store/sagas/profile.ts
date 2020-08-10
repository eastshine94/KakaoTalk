import {all, call, put, takeLatest} from 'redux-saga/effects';
import { ProfileTypes, ChangeProfileAction } from '~/store/actions/profile';
import { changeProfile } from '~/apis/user'
import { UserTypes } from '~/store/actions/user';
export default function* profileSaga() {
    yield all([
        takeLatest(ProfileTypes.CHANGE_PROFILE_REQUEST, changeProfile$),
    ])
}

function* changeProfile$(action: ChangeProfileAction) {
    const profileData = action.payload;
    try {
        yield call(changeProfile, profileData);
        yield put({
            type: ProfileTypes.CHANGE_PROFILE_SUCCESS,
            payload: profileData
        })
        yield put({
            type: UserTypes.CHANGE_PROFILE,
            payload: profileData,
        })
    } catch (err) {
        yield put({
            type: ProfileTypes.CHANGE_PROFILE_FAILUER,
            payload: "프로필 변경 실패",
        })
    }
    
}