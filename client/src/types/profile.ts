// 프로필 변경 요청 시
export interface ProfileChangeRequestDto {
    id: number;
    name?: string;
    status_msg?: string;
    profile_img_url?: string,
    background_img_url?: string,
}

// 친구 이름 변경 요청 시
export interface ChangeFriendNameRequestDto {
    my_id: number;
    friend_id: number;
    friend_name: string;
}