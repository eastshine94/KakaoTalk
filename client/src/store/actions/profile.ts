import { UserData } from '../../types/user';

export enum ProfileTypes {
    SHOW_PROFILE = "profile/SHOW_PROFILE",
    HIDE_PROFILE = "profile/HIDE_PROFILE"
}

export interface ShowProfileAction {
    type: ProfileTypes.SHOW_PROFILE;
    payload: UserData;
}
export interface HideProfileAction {
    type: ProfileTypes.HIDE_PROFILE;
}
export type ProfileActionTypes = ShowProfileAction
| HideProfileAction;

export const showProfile = (userData: UserData):ShowProfileAction => ({
    type: ProfileTypes.SHOW_PROFILE,
    payload: userData,
});
export const hideProfile = ():HideProfileAction => ({
    type: ProfileTypes.HIDE_PROFILE,
});

export const ProfileActions = {
    showProfile,
    hideProfile,
}
