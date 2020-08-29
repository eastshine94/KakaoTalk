import { RoomListDto } from './chatting';

export interface UserData {
    id: number;
    user_id: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
    friends_list: Array<UserResponseDto>,
    room_list: Array<RoomListDto>,
}


export interface UserResponseDto {
    id: number;
    user_id: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string
}



