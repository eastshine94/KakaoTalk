export interface UserData {
    id: number|undefined;
    user_id: string|undefined,
    name: string|undefined,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
}

export interface UserResponseDto {
    id: number;
    user_id: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
}