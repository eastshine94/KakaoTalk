import axios from 'axios';
import { HOST, API_HOST } from '~/constants';
import { ApiResponse } from '~/types/base';
import { UserResponseDto } from '~/types/user';
import { ProfileChangeRequestDto } from '../types/profile';


export const findUser = async(userId: string) => {
    const foundUser: ApiResponse<UserResponseDto> = await axios.get(`${API_HOST}/user/${userId}`);
    return foundUser.data.data;
}

export const findUserUsingId = async(id: number) => {
    const foundUser: ApiResponse<UserResponseDto> = await axios.get(`${API_HOST}/user/find/${id}`);
    return foundUser.data.data;
}

export const changeProfile = async(profileData: ProfileChangeRequestDto) => {
    await axios.post(`${API_HOST}/user/profile/change`, profileData);
    return profileData;
}

export const uploadImageFile = async(image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const imageUrl: ApiResponse<string> = await axios.post(`${API_HOST}/user/upload`, formData);
    return `${HOST}/${imageUrl.data.data}`;
}
