import axios from 'axios';
import { UserResponseDto} from '~/types/user';
import { AddFriendRequest } from '~/types/friend';
import { ChangeFriendNameRequestDto } from '~/types/profile';
import {ApiResponse} from '~/types/base';
const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export const addFriendRequest = async(request: AddFriendRequest) => {
    const addedFriend:ApiResponse<boolean> = await axios.post(`${API_HOST}/friend/add`, request);
    return addedFriend.data.data;
}

export const fecthFriendsRequest = async(id: number) => {
    const friends:ApiResponse<Array<UserResponseDto>> = await axios.get(`${API_HOST}/friend/${id}`);
    return friends.data.data;
}

export const changeFriendNameRequest = async(request: ChangeFriendNameRequestDto) => {
    const response:ApiResponse<boolean> = await axios.post(`${API_HOST}/friend/profile/change`,request);
    return response.data.data;
}