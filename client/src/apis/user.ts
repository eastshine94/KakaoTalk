import axios from 'axios';
import { ApiResponse } from '~/types/base';
import { UserData } from '~/types/user';


const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export const fetchUser = async(userId: string) => {
    const foundUser: ApiResponse<UserData> = await axios.post(`${API_HOST}/auth/find`, {user_id: userId});
    return foundUser.data.data;
}