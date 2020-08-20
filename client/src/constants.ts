export enum PAGE_PATHS  {
    HOME = '/',
    LOGIN = '/login',
    SIGNUP = '/signup',
    MENU = '/menu',
    FRIENDS = '/menu/friends',
    CHATTING = '/menu/chatting',
    CHATTING_ROOM = '/room',
}

export const HOST = process.env.HOST || 'http://localhost:3001';

export const API_HOST = process.env.API_HOST || `${HOST}/api`;

export const BASE_IMG_URL = '/asset/base_profile.jpg';
