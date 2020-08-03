import {AuthTypes, AuthActionTypes} from "~/store/actions/auth";

export interface AuthState {
  token: string|null;
  isLoggingIn: boolean; // 로그인 시도중
}
const initialState: AuthState = {
  token: window.sessionStorage.getItem('jwt'),
  isLoggingIn: false, 
}

const authReducer = (state = initialState, action: AuthActionTypes )=> {
  switch(action.type){
    case AuthTypes.LOGIN_REQUEST: 
      return {
        ...state,
        isLoggingIn: true,
      }
    case AuthTypes.LOGIN_SUCCESS : 
      return {
        ...state,
        isLoggingIn: false,
        token: action.payload
      };
    case AuthTypes.LOGIN_FAILURE :
      return {
        ...state,
        isLoggingIn: false,
      }
    case AuthTypes.LOGOUT : 
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
}

export default authReducer;