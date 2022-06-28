import axios from 'axios';
import { API_HOST } from '~/constants';
import { LoginData, SignupData } from '~/types/auth';
import { ApiResponse } from '~/types/base';

interface SignupRequestDto {
  user_id: string;
  password: string;
  name: string;
}

interface LoginResponseDto {
  token: string;
}

// 서버에 회원가입 요청
export const signup = async (signupData: SignupData) => {
  const signupRequest: SignupRequestDto = {
    user_id: signupData.userId,
    password: signupData.password,
    name: signupData.name
  };
  await axios.post(`${API_HOST}/auth/signup`, signupRequest);
};

// 서버에 로그인 요청
export const login = async (loginData: LoginData) => {
  const request = {
    user_id: loginData.userId,
    password: loginData.password
  };
  const response: ApiResponse<LoginResponseDto> = await axios.post(
    `${API_HOST}/auth/login`,
    request
  );
  const token = response.data.data.token;

  return token;
};

export const logout = () => {
  window.sessionStorage.removeItem('jwt');
};
