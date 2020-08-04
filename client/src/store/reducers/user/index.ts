import { UserTypes, UserActionTypes } from '~/store/actions/user';
import {UserData} from '~/types/user';

export interface UserState extends UserData {
    id: number|undefined;
    user_id: string|undefined,
    name: string|undefined,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
}


const initialState: UserState = {
    id: undefined,
    user_id: undefined,
    name: undefined,
    status_msg: "",
    profile_img_url: "",
    background_img_url: "",
}


const userReducer = (state=initialState, action:UserActionTypes) => {
    switch(action.type){
        case UserTypes.FETCH_USER :
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}

export default userReducer;