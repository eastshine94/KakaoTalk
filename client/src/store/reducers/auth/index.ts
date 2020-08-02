import * as types from "~/store/actionTypes/auth";
import { LoginData } from "~/types/auth";

export interface AuthState {
  token: string;
  isLoggedIn: boolean; // 로그인 여부
  isLoggingOut: boolean; // 로그아웃 시도중
  isLoggingIn: boolean; // 로그인 시도중
}
const initialState: AuthState = {
  token: "",
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggingIn: false, 
}


export interface LoginAction {
  type: typeof types.LOGIN_REQUEST;
  payload: LoginData;
}
export interface LoginSuccessAction {
  type: typeof types.LOGIN_SUCCESS;
  payload: string;
}
export interface LoginFailureAction {
  type: typeof types.LOGIN_FAILURE;
  payload: string;
}

export type AuthActionTypes = LoginAction
| LoginSuccessAction
| LoginFailureAction;

const authReducer = (state = initialState, action: AuthActionTypes )=> {
  switch(action.type){
    case types.LOGIN_REQUEST: 
      return {
        ...state,
        isLoggingIn: true,
      }
    case types.LOGIN_SUCCESS : 
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        token: action.payload
      };
    case types.LOGIN_FAILURE :
      return {
        ...state,
        isLoggingIn: false,
      }
    default:
      return state;
  }
}

export default authReducer;