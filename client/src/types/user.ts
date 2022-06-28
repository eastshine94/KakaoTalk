import { RoomListResponse } from './chatting';

// user state type
export interface UserData {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
  friends_list: Array<UserResponseDto>;
  room_list: Array<RoomListResponse>;
}

// 서버에서 가져온 유저 정보
export interface UserResponseDto {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
}
