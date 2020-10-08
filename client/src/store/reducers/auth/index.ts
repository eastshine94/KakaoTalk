import jwtDecode from 'jwt-decode';
import socketio, {Socket} from 'socket.io-client';
import {AuthTypes, AuthActionTypes} from "~/store/actions/auth";
import {Auth} from '~/types/auth';
import { HOST } from '~/constants';

export interface AuthState {
  auth: Auth|undefined;
  socket: typeof Socket | undefined;
  token: string|null;
  loginFailuerMsg: string;
  loggingIn: boolean;
}

const initialState: AuthState = {
  auth: undefined,
  socket: undefined,
  token: window.sessionStorage.getItem('jwt'),
  loginFailuerMsg: "",
  loggingIn: false, 
}

if (initialState.token) {
   initialState.auth = jwtDecode(initialState.token) as Auth;
   initialState.socket = socketio.connect(HOST);
}

const authReducer = (state = initialState, action: AuthActionTypes )=> {
  switch(action.type){
    case AuthTypes.LOGIN_REQUEST :
      return {
        ...state,
        loggingIn: true,
      }
    case AuthTypes.LOGIN_SUCCESS : 
      return {
        ...state,
        loginFailuerMsg:"",
        loggingIn: false,
        socket: socketio.connect(HOST),
        auth: action.payload.auth,
        token: action.payload.token
      };
    case AuthTypes.LOGIN_FAILURE :
      return {
        ...state,
        loggingIn: false,
        loginFailuerMsg: action.payload,
      }
    case AuthTypes.LOGOUT : 
      return {
        ...state,
        token: null,
        auth: undefined,
        socket: undefined
      };
    case AuthTypes.CHANGE_MESSAGE :
      return {
        ...state,
        loginFailuerMsg: action.payload,
      }
    default:
      return state;
  }
}

export default authReducer;