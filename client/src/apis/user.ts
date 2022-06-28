import axios from 'axios';
import { HOST, API_HOST } from '~/constants';
import { ApiResponse } from '~/types/base';
import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto } from '../types/profile';

// 서버에서 User ID를 통해 해당 유저의 정보를 가져옴, 회원 가입 여부 등에 사용
export const findUser = async (userId: string) => {
  const foundUser: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/user/${userId}`
  );
  return foundUser.data.data;
};

// UID를 이용하여 유저 정보를 찾는다. 채팅방 참가자의 정보를 가져오기 위해 사용
export const findUserUsingId = async (id: number) => {
  const foundUser: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/user/find/${id}`
  );
  return foundUser.data.data;
};

// 프로필 변경(사진, 배경, 이름 등등)
export const changeProfile = async (profileData: ProfileChangeRequestDto) => {
  await axios.post(`${API_HOST}/user/profile/change`, profileData);
  return profileData;
};

// 이미지를 서버로 업로드
export const uploadImageFile = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const imageUrl: ApiResponse<string> = await axios.post(
    `${API_HOST}/user/upload`,
    formData
  );
  return `${HOST}/${imageUrl.data.data}`;
};
