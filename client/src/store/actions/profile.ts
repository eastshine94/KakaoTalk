import { UserResponseDto } from '../../types/user';
import {
  ProfileChangeRequestDto,
  ChangeFriendNameRequestDto
} from '../../types/profile';

export enum ProfileTypes {
  SHOW_PROFILE = 'profile/SHOW_PROFILE',
  HIDE_PROFILE = 'profile/HIDE_PROFILE',
  CHANGE_PROFILE_REQUEST = 'profile/CHANGE_PROFILE_REQUEST',
  CHANGE_PROFILE_SUCCESS = 'profile/CHANGE_PROFILE_SUCCESS',
  CHANGE_PROFILE_FAILUER = 'profile/CHANGE_PROFILE_FAILUER',
  CHANGE_FRIEND_NAME_REQUEST = 'profile/CHANGE_FRIEND_NAME_REQUEST',
  CHANGE_FRIEND_NAME_SUCCESS = 'profile/CHANGE_FRIEND_NAME_SUCCESS',
  CHANGE_FRIEND_NAME_FAILUER = 'profile/CHANGE_FRIEND_NAME_FAILUER'
}

export interface ShowProfileAction {
  type: ProfileTypes.SHOW_PROFILE;
  payload: UserResponseDto;
}
export interface HideProfileAction {
  type: ProfileTypes.HIDE_PROFILE;
}
export interface ChangeProfileAction {
  type: ProfileTypes.CHANGE_PROFILE_REQUEST;
  payload: ProfileChangeRequestDto;
}

export interface ChangeProfileSuccessAction {
  type: ProfileTypes.CHANGE_PROFILE_SUCCESS;
  payload: ProfileChangeRequestDto;
}

export interface ChangeFriendNameAction {
  type: ProfileTypes.CHANGE_FRIEND_NAME_REQUEST;
  payload: ChangeFriendNameRequestDto;
}

export interface ChangeFriendNameSuccessAction {
  type: ProfileTypes.CHANGE_FRIEND_NAME_SUCCESS;
  payload: string;
}

export type ProfileActionTypes =
  | ShowProfileAction
  | HideProfileAction
  | ChangeProfileAction
  | ChangeProfileSuccessAction
  | ChangeFriendNameAction
  | ChangeFriendNameSuccessAction;

export const showProfile = (userData: UserResponseDto): ShowProfileAction => ({
  type: ProfileTypes.SHOW_PROFILE,
  payload: userData
});
export const hideProfile = (): HideProfileAction => ({
  type: ProfileTypes.HIDE_PROFILE
});

// 이름, 상태 메시지, 프로필 사진 등을 변경
export const changeProfile = (
  profileData: ProfileChangeRequestDto
): ChangeProfileAction => ({
  type: ProfileTypes.CHANGE_PROFILE_REQUEST,
  payload: profileData
});

export const changeFriendName = (
  request: ChangeFriendNameRequestDto
): ChangeFriendNameAction => ({
  type: ProfileTypes.CHANGE_FRIEND_NAME_REQUEST,
  payload: request
});

export const ProfileActions = {
  showProfile,
  hideProfile,
  changeProfile,
  changeFriendName
};
