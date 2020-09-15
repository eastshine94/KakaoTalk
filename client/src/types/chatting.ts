import { UserResponseDto } from './user';

export type RoomType = "individual" | "group";

export interface ChattingDto {
    room_id: number;
    type: RoomType | undefined;
    identifier: string;
    room_name: string;
    participant: Array<UserResponseDto>;
    chatting: Array<ChattingResponseDto>;
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

export interface RoomListDto {
    room_id: number;
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<UserResponseDto>;
    last_chat: string;
    not_read_chat: number;
    last_read_chat_id: number;
    updatedAt: Date;
}

export interface CreateRoomRequest {
    my_id?: number;
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

export interface UpdateRoomListDto {
    room_id: number;
    room_name?: string;
    last_chat?: string;
    not_read_chat?: number;
    last_read_chat_id?: number;
    updatedAt?: Date;
}

export interface ChattingRequestDto {
    room_id: number;
    type: RoomType;
    participant: Array<UserResponseDto>;
    send_user_id: number;
    message: string;
    not_read: number;
}

export interface ChattingResponseDto{
    id: number;
    room_id: number;
    send_user_id: number;
    message: string;
    not_read: number;
    createdAt: Date;
}

export interface FetchChattingRequest {
    room_id: number;
    cursor: number | null;
}


