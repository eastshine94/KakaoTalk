import { UserResponseDto } from '~/types/user';
import { ProfileTypes, ProfileActionTypes } from '~/store/actions/profile';
export interface ProfileState extends UserResponseDto {
    isProfileShown: boolean;
}

const initialState: ProfileState = {
    id: -1,
    user_id: "",
    name: "",
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
                id: -1,
                user_id: "",
                name: "",
                status_msg: "",
                profile_img_url: "",
                background_img_url: "",
                isProfileShown: false,
            }
        case ProfileTypes.CHANGE_PROFILE_SUCCESS :
            return {
                ...state,
                ...action.payload,
            }
        case ProfileTypes.CHANGE_FRIEND_NAME_SUCCESS :
            return {
                ...state,
                name: action.payload
            }
        default :
            return state;
    }
};

export default profileReducer;