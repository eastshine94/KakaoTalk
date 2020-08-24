export interface RoomDto {
    id: number;
    participant:Array<number> ;
}

export interface ChattingResponseDto{
    id: number;
    send_user_id: number;
    message: string;
}