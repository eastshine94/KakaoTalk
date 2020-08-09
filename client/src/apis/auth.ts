import axios from 'axios';
import {LoginData, SignupData} from '~/types/auth';
import { ApiResponse } from '~/types/base';
import { UserData } from '~/types/user';
interface SignupRequestDto {
    user_id: string; 
    password: string;
    name: string;
}

interface LoginResponseDto {
    token: string;
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
    const foundUser: ApiResponse<UserData> = await axios.post(`${API_HOST}/auth/find`, {user_id: userId});
    return foundUser.data.data;
}

export const login = async(loginData: LoginData)  => {
    const request = {
        user_id: loginData.userId,
        password: loginData.password,
    }
    const response: ApiResponse<LoginResponseDto> = await axios.post(`${API_HOST}/auth/login`, request);
    const token = response.data.data.token;
    
    return token;
}

export const logout = () => {
    window.sessionStorage.removeItem("jwt");
}

