import {UserData} from '~/types/user';
import { ProfileTypes, ProfileActionTypes } from '~/store/actions/profile';
export interface ProfileState extends UserData {
    isProfileShown: boolean;
}

const initialState: ProfileState = {
    id: undefined,
    user_id: undefined,
    name: undefined,
    status_msg: "",
    profile_img_url: "",
    background_img_url: "",
    isProfileShown: false,
}


const profileReducer = (state = initialState, action:ProfileActionTypes ) => {

    switch(action.type){
        case ProfileTypes.SHOW_PROFILE :
            return{
                ...state,
                ...action.payload,
                isProfileShown: true,
            };
        case ProfileTypes.HIDE_PROFILE :
            return{
                ...state,
                id: undefined,
                user_id: undefined,
                name: undefined,
                status_msg: "",
                profile_img_url: "",
                background_img_url: "",
                isProfileShown: false,
            }
        default :
            return state;
    }
};

export default profileReducer;