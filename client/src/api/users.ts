interface UserDto {
    id: number;
    user_id: string,
    password: string,
    name: string,
    status_msg: string;
    profile_img_url: string,
    background_img_url: string,
    created_at: Date,
    updated_at: Date,
}

const date = new Date();
export const users: Array<UserDto>  = [
    { id: 1, user_id: "test01", password:"123456", name: "홍길동", status_msg: "", profile_img_url:"", background_img_url: "", created_at: date, updated_at: date},
    { id: 2, user_id: "test02", password:"123456", name: "김갑수", status_msg: "갑수올시다.", profile_img_url:"/asset/profile1.jpg", background_img_url: "/asset/bg1.jpg", created_at: date, updated_at: date},
    { id: 3, user_id: "test03", password:"123456", name: "장갑판", status_msg: "만나서 반갑습니다.", profile_img_url:"/asset/profile2.jpg", background_img_url: "/asset/bg2.jpg", created_at: date, updated_at: date}
]
