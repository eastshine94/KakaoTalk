import axios from 'axios';
import {ApiResponse, LoginData, SignupData} from '~/types/auth';

interface SignupRequestDto {
    user_id: string; 
    password: string;
    name: string;
}

interface LoginResponseDto {
    token: string;
}


interface UserDto {
    id: number;
    user_id: string,
    password: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
    created_at: Date,
    updated_at: Date,
}

const API_HOST = process.env.API_HOST || 'http://localhost:3001/api';

export const signup = async(signupData: SignupData) => {
    console.log("signup");
    const signupRequest: SignupRequestDto = {
        user_id: signupData.userId,
        password: signupData.password,
        name: signupData.name,
    }
    await axios.post(`${API_HOST}/auth/signup`, signupRequest);
}

export const findUser = async(userId: string) => {
    const foundUser: ApiResponse<boolean> = await axios.post(`${API_HOST}/auth/find`, {user_id: userId});
    return foundUser.data.data;
}
// 나중에 jwt로 대체
export const login = (loginData: LoginData)  => {
    
}

export const logout = () => {
    window.sessionStorage.removeItem("jwt");
}

