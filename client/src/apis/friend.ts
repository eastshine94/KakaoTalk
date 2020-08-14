import axios from 'axios';
import { AddFriendRequest } from '~/types/friend';

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export const addFriendRequest = async(request: AddFriendRequest) => {
    await axios.post(`${API_HOST}/friend/add`, request);
}