import axios from 'axios';
import { AddFriendRequest } from '~/types/friend';
import {ApiResponse} from '~/types/base';
const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export const addFriendRequest = async(request: AddFriendRequest) => {
    const addedFriend:ApiResponse<boolean> = await axios.post(`${API_HOST}/friend/add`, request);
    return addedFriend.data.data;
}