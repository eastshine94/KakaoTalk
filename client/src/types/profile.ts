export interface ProfileChangeRequestDto {
    id: number;
    name?: string;
    status_msg?: string;
    profile_img_url?: string,
    background_img_url?: string,
}

export interface ChangeFriendNameRequestDto {
    my_id: number;
    friend_id: number;
    friend_name: string;
}