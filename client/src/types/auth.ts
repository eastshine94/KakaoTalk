export interface LoginData {
    userId: string;
    password: string;
}

export interface SignupData {
    userId: string;
    password: string;
    name: string;
}

export interface Auth {
    id: number;
    user_id: string;
}