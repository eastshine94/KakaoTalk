export interface LoginData {
  userId: string;
  password: string;
}

export interface SignupData {
  userId: string;
  password: string;
  name: string;
}

// token Decord 시 나오는 유저 정보
export interface Auth {
  id: number;
  user_id: string;
}
