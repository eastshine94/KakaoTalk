import { UserResponseDto } from '../../types/user';
import { ProfileChangeRequestDto } from '../../types/profile';

export enum ProfileTypes {
    SHOW_PROFILE = "profile/SHOW_PROFILE",
    HIDE_PROFILE = "profile/HIDE_PROFILE",
    CHANGE_PROFILE_REQUEST = "profile/CHANGE_PROFILE_REQUEST",
    CHANGE_PROFILE_SUCCESS = "profile/CHANGE_PROFILE_SUCCESS",
    CHANGE_PROFILE_FAILUER = "profile/CHANGE_PROFILE_FAILUER",
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

export type ProfileActionTypes = ShowProfileAction
| HideProfileAction
| ChangeProfileAction
| ChangeProfileSuccessAction;

export const showProfile = (userData: UserResponseDto):ShowProfileAction => ({
    type: ProfileTypes.SHOW_PROFILE,
    payload: userData,
});
export const hideProfile = (): HideProfileAction => ({
    type: ProfileTypes.HIDE_PROFILE,
});

export const changeProfile = (profileData: ProfileChangeRequestDto): ChangeProfileAction => ({
    type: ProfileTypes.CHANGE_PROFILE_REQUEST,
    payload: profileData,
})

export const ProfileActions = {
    showProfile,
    hideProfile,
    changeProfile,
}
