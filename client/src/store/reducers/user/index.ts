import { UserTypes, UserActionTypes } from '~/store/actions/user';
import {UserData} from '~/types/user';

export interface UserState extends UserData {
}


const initialState: UserState = {
    id: -1,
    user_id: "",
    name: "",
    status_msg: "",
    profile_img_url: "",
    background_img_url: "",
    friends_list: [],
}


const userReducer = (state=initialState, action:UserActionTypes) => {
    switch(action.type){
        case UserTypes.FETCH_USER_SUCCESS :
            return {
                ...state,
                ...action.payload
            }
        case UserTypes.CHANGE_PROFILE :
            return {
                ...state,
                ...action.payload
            }
        case UserTypes.CHANGE_FRIEND_NAME :
            return {
                ...state,
                friends_list : state.friends_list.map(friend => {
                    if(friend.id === action.payload.friend_id){
                        return {...friend, name: action.payload.friend_name}
                    }
                    return friend
                }).sort((a,b)=>{
                    return a.name > b.name ? 1 : (a.name === b.name ? 0 : -1);
                }),
            }
        case UserTypes.ADD_FRIEND :
            return {
                ...state,
                friends_list : [
                    ...state.friends_list,
                    action.payload
                ].sort((a,b)=>{
                    return a.name > b.name ? 1 : (a.name === b.name ? 0 : -1);
                }),
            }
        case UserTypes.FETCH_FRIENDS_SUCCESS :
            return {
                ...state,
                friends_list: action.payload.sort((a,b)=>{
                    return a.name > b.name ? 1 : (a.name === b.name ? 0 : -1);
                })
            }
        case UserTypes.RESET_USER :
            return {
                ...state,
                id: -1,
                user_id: "",
                name: "",
                status_msg: "",
                profile_img_url: "",
                background_img_url: "",
                friends_list: []
            }
        default: 
            return state
    }
}

export default userReducer;