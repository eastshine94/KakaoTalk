import { LoginData, Auth } from "~/types/auth";

export enum AuthTypes { 
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE =  'auth/LOGIN_FAILURE',
  LOGOUT = 'auth/LOGOUT',
  RETURN_AUTH_INIT_STATE = "auth/RETURN_AUTH_INIT_STATE",
};

export interface LoginAction {
  type: AuthTypes.LOGIN_REQUEST;
  payload: LoginData;
}
export interface LoginSuccessAction {
  type: AuthTypes.LOGIN_SUCCESS;
  payload: {
    token: string,
    auth: Auth
  };
}
export interface LoginFailureAction {
  type: AuthTypes.LOGIN_FAILURE;
  payload: string;
}
  
export interface LogoutAction {
  type: AuthTypes.LOGOUT;
}

export interface ReturnAuthInitStateAction{
  type: AuthTypes.RETURN_AUTH_INIT_STATE;
}

export type AuthActionTypes = LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ReturnAuthInitStateAction

export const login = (loginData: LoginData): LoginAction => ({
  type: AuthTypes.LOGIN_REQUEST,
  payload: loginData
})

export const logout = (): LogoutAction => ({
  type: AuthTypes.LOGOUT,
})
export const returnAuthInitState = (): ReturnAuthInitStateAction => ({
  type: AuthTypes.RETURN_AUTH_INIT_STATE,
})
export const AuthActions = {
    login,
    logout,
    returnAuthInitState,
}