import axios from 'axios';
import { API_HOST } from '~/constants';
import { UserResponseDto } from '~/types/user';
import { AddFriendRequestDto } from '~/types/friend';
import { ChangeFriendNameRequestDto } from '~/types/profile';
import { ApiResponse } from '~/types/base';

// 친구 추가 요청
export const addFriendRequest = async (request: AddFriendRequestDto) => {
  const addedFriend: ApiResponse<boolean> = await axios.post(
    `${API_HOST}/friend/add`,
    request
  );
  return addedFriend.data.data;
};

// 친구 목록 가져옴
export const fecthFriendsRequest = async (id: number) => {
  const friends: ApiResponse<Array<UserResponseDto>> = await axios.get(
    `${API_HOST}/friend/${id}`
  );
  return friends.data.data;
};

// 친구 이름 변경 요청
export const changeFriendNameRequest = async (
  request: ChangeFriendNameRequestDto
) => {
  const response: ApiResponse<boolean> = await axios.post(
    `${API_HOST}/friend/profile/change`,
    request
  );
  return response.data.data;
};
