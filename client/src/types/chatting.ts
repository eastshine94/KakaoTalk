import { UserResponseDto } from './user';

export type RoomType = 'individual' | 'group';

// chat state
export interface ChattingDto {
  room_id: number;
  type: RoomType | undefined;
  identifier: string;
  room_name: string;
  participant: Array<UserResponseDto>;
  chatting: Array<ChattingResponseDto>;
  last_read_chat_id: number;
}

// 현재 채팅방의 정보를 바꿀 때 요청
export interface ChangeChattingRoomDto {
  room_id?: number;
  room_name?: string;
  participant?: Array<UserResponseDto>;
  last_read_chat_id?: number;
}

// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
export interface RoomListResponse {
  room_id: number;
  type: RoomType;
  identifier: string;
  room_name: string;
  participant: Array<number>;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}

// 채팅방들의 참가자 정보를 명확히
export interface RoomListDto {
  room_id: number;
  type: RoomType;
  identifier: string;
  room_name: string;
  participant: Array<UserResponseDto>;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}

// 채팅방 만들기 요청
export interface CreateRoomRequest {
  my_id?: number;
  type: RoomType;
  identifier: string;
  room_name: string;
  participant: Array<UserResponseDto>;
}
// 서버에서 채팅방 정보 가져옴
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

// 채팅방 리스트의 채팅방들 정보를 바꿀 때 요청
export interface UpdateRoomListDto {
  room_id: number;
  room_name?: string;
  last_chat?: string;
  not_read_chat?: number;
  last_read_chat_id?: number;
  updatedAt?: Date;
}

// 채팅 송신
export interface ChattingRequestDto {
  room_id: number;
  type: RoomType;
  participant: Array<UserResponseDto>;
  send_user_id: number;
  message: string;
  not_read: number;
}

// 채팅 수신
export interface ChattingResponseDto {
  id: number;
  room_id: number;
  send_user_id: number;
  message: string;
  not_read: number;
  createdAt: Date;
}

// 서버에 채팅 가져오기
// cursor를 기준으로 채팅을 가져옵니다.
export interface FetchChattingRequest {
  room_id: number;
  cursor: number | null;
}

// 채팅 읽었음을 알려줄 떄 사용
export interface ReadChatRequest {
  user_id: number;
  room_id: number;
  type: RoomType;
  participant: Array<UserResponseDto>;
  last_read_chat_id_range: Array<number>;
}

// 상대방이 채팅 읽었음을 알려 올 때 사용
export interface ReadChatResponse {
  room_id: number;
  last_read_chat_id_range: Array<number>;
}
