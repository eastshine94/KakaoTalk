import axios from 'axios';
import { ApiResponse } from '~/types/base';
import { API_HOST } from '~/constants';
import { CreateRoomRequest, CreateRoomResponse, RoomListDto } from '~/types/chatting';


export const createRoom = async(param: CreateRoomRequest) => {
    const room:ApiResponse<CreateRoomResponse> = await axios.post(`${API_HOST}/chat/room/create`, param);

    return room.data.data;
}

export const fetchRoomList = async(userId: number) => {
    const roomList: ApiResponse<Array<RoomListDto>> = await axios.get(`${API_HOST}/chat/roomList/${userId}`);
    
    return roomList.data.data;
}