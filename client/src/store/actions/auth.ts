import { LoginData, Auth } from "~/types/auth";

export enum AuthTypes { 
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE =  'auth/LOGIN_FAILURE',
  LOGOUT = 'auth/LOGOUT',
  RESET_MESSAGE = "auth/RESET_MESSAGE",
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

export interface ResetMessageAction{
  type: AuthTypes.RESET_MESSAGE;
}

export type AuthActionTypes = LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ResetMessageAction

export const login = (loginData: LoginData): LoginAction => ({
  type: AuthTypes.LOGIN_REQUEST,
  payload: loginData
})

export const logout = (): LogoutAction => ({
  type: AuthTypes.LOGOUT,
})
export const resetMessage = (): ResetMessageAction => ({
  type: AuthTypes.RESET_MESSAGE,
})
export const AuthActions = {
    login,
    logout,
    resetMessage,
}