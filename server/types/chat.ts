
export type RoomType = "individual" | "group";

export interface UserResponseDto {
    id: number;
    user_id: string;
    name: string;
    status_msg: string;
    profile_img_url: string;
    background_img_url: string;
}

export interface CreateRoomRequest {
    my_id: number;
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<UserResponseDto>;
}
export interface CreateRoomResponse {
    room_id: number;
    identifier: string;
    type: RoomType;
    room_name: string;
    last_chat: string;
    not_read_chat: number;
    last_read_chat_id: number;
    updatedAt: Date;
}

export interface MessageRequest {
    room_id: number;
    type: RoomType;
    participant: Array<UserResponseDto>;
    send_user_id: number;
    message: string;
    not_read: number;
}
export interface MessageResponse {
    id: number;
    room_id: number;
    send_user_id: number;
    message: string;
    not_read: number;
    createdAt: Date;
}

export interface RoomListResponse {
    room_id: number;
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<number>;
    last_chat: string;
    not_read_chat: number;
    last_read_chat_id: number;
    updatedAt: Date;
}


export interface ReadChatRequest {
    user_id: number;
    room_id: number;
    type: RoomType;
    participant: Array<UserResponseDto>;
    last_read_chat_id: number;
}

export interface ReadChatResponse{
    room_id: number;
    last_read_chat_id: number;
}