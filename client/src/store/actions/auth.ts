import { LoginData } from "~/types/auth";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const AuthTypes = { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE };

export interface LoginAction {
    type: typeof LOGIN_REQUEST;
    payload: LoginData;
  }
  export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: string;
  }
  export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
  }
  
export type AuthActionTypes = LoginAction
  | LoginSuccessAction
  | LoginFailureAction;

export const login = (loginData: LoginData): LoginAction => ({
    type: LOGIN_REQUEST,
    payload: loginData
})

export const AuthActions = {
    login,
}