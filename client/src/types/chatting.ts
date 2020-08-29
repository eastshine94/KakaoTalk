import { UserResponseDto } from './user';

export type RoomType = "individual" | "group";

export interface ChattingDto {
    type: RoomType | undefined;
    identifier: string;
    room_name: string;
    participant: Array<UserResponseDto>;
    chatting: Array<ChattingResponseDto>;
}

export interface RoomListDto {
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<number>;
    last_chat: string;
    updated_at: Date;
}

export interface ChattingResponseDto{
    id: number;
    send_user_id: number;
    message: string;
}

export interface ChattingRequestDto{
    send_user_id: number;
    message: string;
}