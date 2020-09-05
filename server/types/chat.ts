
export type RoomType = "individual" | "group";

export interface UserResponseDto {
    id: number;
    user_id: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string
}

export interface CreateRoomRequest {
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<UserResponseDto>;
}

export interface MessageRequest {
    room_id: number;
    type: RoomType;
    participant: Array<UserResponseDto>;
    send_user_id: number;
    message: string;
}

export interface RoomListDto {
    room_id: number;
    type: RoomType;
    identifier: string;
    room_name: string;
    participant:Array<number>;
    last_chat: string;
    updated_at: Date;
}