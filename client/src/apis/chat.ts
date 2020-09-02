import axios from 'axios';
import { ApiResponse } from '~/types/base';
import { API_HOST } from '~/constants';
import { CreateRoomRequest, CreateRoomResponse } from '~/types/chatting';


export const createRoom = async(param: CreateRoomRequest) => {
    const room:ApiResponse<CreateRoomResponse> = await axios.post(`${API_HOST}/chat/room/create`, param);

    return room.data.data;
}