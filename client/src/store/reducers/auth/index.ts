import jwtDecode from 'jwt-decode';
import {AuthTypes, AuthActionTypes} from "~/store/actions/auth";
import {Auth} from '~/types/auth';
export interface AuthState {
  auth: Auth|undefined;
  token: string|null;
  loginFailuerMsg: string;
}
const initialState: AuthState = {
  auth: undefined,
  token: window.sessionStorage.getItem('jwt'),
  loginFailuerMsg: "", 
}

if (initialState.token) {
   initialState.auth = jwtDecode(initialState.token) as Auth;
}

const authReducer = (state = initialState, action: AuthActionTypes )=> {
  switch(action.type){
    case AuthTypes.LOGIN_REQUEST: 
      return {
        ...state,
      }
    case AuthTypes.LOGIN_SUCCESS : 
      return {
        ...state,
        loginFailuerMsg:"",
        auth: action.payload.auth,
        token: action.payload.token
      };
    case AuthTypes.LOGIN_FAILURE :
      return {
        ...state,
        loginFailuerMsg: action.payload,
      }
    case AuthTypes.LOGOUT : 
      return {
        ...state,
        token: null,
        auth: undefined,
      };
    default:
      return state;
  }
}

export default authReducer;