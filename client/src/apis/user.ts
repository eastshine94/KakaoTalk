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

let date = new Date();
let id = 4;
export const users: Array<UserDto>  = [
    { id: 1, user_id: "test01", password:"123456", name: "홍길동", status_msg: "", profile_img_url:"", background_img_url: "", created_at: date, updated_at: date},
    { id: 2, user_id: "test02", password:"123456", name: "김갑수", status_msg: "갑수올시다.", profile_img_url:"/asset/profile1.jpg", background_img_url: "/asset/bg1.jpg", created_at: date, updated_at: date},
    { id: 3, user_id: "test03", password:"123456", name: "장갑판", status_msg: "만나서 반갑습니다.", profile_img_url:"/asset/profile2.jpg", background_img_url: "/asset/bg2.jpg", created_at: date, updated_at: date}
]

export const signup = (userId: string, pw: string, name:string) => {
    date = new Date();
    users.push({id: id++,user_id: userId, password: pw, name, status_msg:"", profile_img_url:"", background_img_url:"", created_at: date, updated_at: date})
}

export const findUser = (userId: string) => users.find(user => user.user_id === userId);

// 나중에 jwt로 대체
export const login = (userId: string, pw: string): UserDto|null => {
    const user = findUser(userId);
    if(user){
        if(user.password === pw){
            return user;
        }
    }
    return null;
}

