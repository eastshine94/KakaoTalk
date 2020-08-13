import React from 'react';
import styled from 'styled-components';
import { UserData, UserResponseDto } from '~/types/user';
import {BASE_IMG_URL} from '~/constants';

const FoundUserProfile = styled.div`
    margin-top: 50px;
    & img{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 35px;
        margin: auto;
    }

    & p {
        text-align: center;
        padding-top: 10px;
    }
`
const FindNull = styled.div`
    text-align: center;
    & p {
        padding-top: 50px;
        font-size: 15px;
        font-weight: bold;
    }
`;
const Button = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: inline-block;
    padding: 10px;
    background: #fee500;
    &:hover{
        background: #fada0a;
        cursor: pointer;
    }
`;

interface Props {
    findUserId: string;
    foundUser: UserResponseDto|undefined|null;
    userData: UserData;
}

const FoundFriendProfile: React.FC<Props> = ({findUserId, foundUser, userData}) => {
    if(foundUser){
        const friends = userData.friends_list;
        const existFriend = friends.find(friend => friend.user_id === findUserId);
        const isMe = findUserId === userData.user_id;
        if(existFriend || isMe){
            return(
                <FoundUserProfile>
                    <img src={foundUser.profile_img_url || BASE_IMG_URL} alt="profile_img"/>
                    <p>{existFriend?.name || foundUser.name}</p>
                    <Button>1:1 채팅</Button>
                </FoundUserProfile>
            )
        } 
        return(
            <FoundUserProfile>
                <img src={foundUser.profile_img_url || BASE_IMG_URL} alt="profile_img"/>
                <p>{foundUser.name}</p>
                <Button>친구 추가</Button>
            </FoundUserProfile>
        )
    }
    if(foundUser===null){
        return(
            <FindNull>
                <p>{`'${findUserId}'를 찾을 수 없습니다.`}</p>
            </FindNull>
        )
    }
    return null;
}

export default FoundFriendProfile;