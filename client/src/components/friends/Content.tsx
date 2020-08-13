import React from 'react';
import styled from 'styled-components';
import {  MainContent } from '~/styles/BaseStyle';
import {UserData} from '~/types/user';
import { BASE_IMG_URL } from '~/constants';

const MyProfileBlock = styled.div`
    position: relative;
    padding: 25px 10px 25px 85px;
    & img {
        position: absolute;
        top: 18px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 15px;
        cursor: pointer;
    }
    & p {
        color: #707070;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-height: 19px;
        font-size: 12px;
        & b{
            color: #000;
            font-weight: bold;
            font-size: 14px;
        }
    }
    &:hover {
        background-color: #eaeaeb;
    }
`;

const FriendsBorder = styled.div`
    border-top: 0.5px solid #dcdcdc;
    margin: 0 20px;
    padding-top: 10px;
    & p {
        font-size: 12px;
        color: #b4b4b4;
    }
`;

interface Props {
    userData: UserData;
    showProfile(userData: UserData): void;
}
interface FriendRowProps {
    name: string;
    status_msg: string;
    profile_img_url: string,
}
const FriendRow:React.FC<FriendRowProps> = (props) => {
    const {name, status_msg, profile_img_url} = props
    return(
        <li>
            <img src={profile_img_url||BASE_IMG_URL} alt="profile Image"/>
            <p><b>{name}</b></p>
            <p>{status_msg}</p>
        </li>
    )
}


const Content: React.FC<Props> = ({userData, showProfile}) => {
    const friendsList = userData.friends_list;
    const renderFriends = friendsList.map(friend => <FriendRow {...friend} key={friend.id}/>)
    return(
        <MainContent>
            <MyProfileBlock>
                <img src={userData.profile_img_url||BASE_IMG_URL} alt="profile Image" onClick={() => showProfile(userData)}/>
                <p><b>{userData.name}</b></p>
                <p>{userData.status_msg}</p>
            </MyProfileBlock>
            <FriendsBorder>
                <p>{`친구 ${friendsList.length}`}</p>
            </FriendsBorder>
            <ul>
                {renderFriends}
            </ul>
        </MainContent>
    )
}

export default Content;