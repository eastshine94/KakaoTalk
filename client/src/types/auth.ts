import { AxiosResponse } from 'axios';

interface Response<T> {
    data: T,
    count?: number,
    msg?: string,
}

export type ApiResponse<T> = AxiosResponse<Response<T>>

export interface LoginData {
    userId: string;
    password: string;
}

export interface SignupData {
    userId: string;
    password: string;
    name: string;
}
