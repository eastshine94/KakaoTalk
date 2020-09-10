import React from 'react';
import styled from 'styled-components';
import {UserResponseDto} from '~/types/user';
import { BASE_IMG_URL } from '~/constants';

const Chat = styled.div`
    position: relative;
    display: inline-block;
	padding: 7px 8px;
	border-radius: 4px;
	margin-bottom: 7px;
	box-shadow: 0px 1px 2px 0px #8FABC7;
    max-width: 70%;
    white-space: pre-wrap;
`;

const RightBlock = styled.div`
    text-align: right;
    margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
    
    & ${Chat}{
        background-color: #ffec42;
        text-align: left;
        & span{
            position: absolute;
            bottom: 0;
            left: -65px;
        }
    }
`;

const LeftBlock = styled.div`
    position: relative;
    margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
    padding-left: 50px;
    & ${Chat}{
        background-color: #fff;
        & span{
            position: absolute;
            bottom: 0;
            right: -65px;
        }
    }
    & img {
        position: absolute;
        top: 3px;
        left: 0;
        height: 45px;
        width: 45px;
        border-radius: 20px;
        float: left;
        cursor: pointer;
    }
`;

const NameBlock = styled.div`
    margin-bottom: 5px;
`;

interface ChatProps {
    msg: string;
    localeTime: string;
}

interface FriendChatProps {
    user: UserResponseDto;
    msg: string;
    localeTime: string;
    onImgClick():void;
}


export const MyChat:React.FC<ChatProps> = ({msg, localeTime}) => {
    return(
        <RightBlock>
            <div>
                <Chat>
                    {msg}
                    <span>{localeTime}</span>
                </Chat>
            </div>
        </RightBlock>
    )
}

export const FriendChat:React.FC<ChatProps> = ({msg, localeTime}) => {
    return (
        <LeftBlock>
            <div>
                <Chat>
                    {msg}
                    <span>{localeTime}</span>
                </Chat>
            </div>
        </LeftBlock>
    )
}

export const FriendChatWithThumbnail: React.FC<FriendChatProps> = ({user, msg, localeTime, onImgClick}) => {

    return(
        <LeftBlock>
            <img src={ user.profile_img_url || BASE_IMG_URL } alt="thumbnail" onClick={onImgClick}/>
            <NameBlock>{user.name}</NameBlock>
            <div>
                <Chat>
                    {msg}
                    <span>{localeTime}</span>
                </Chat>
            </div>
        </LeftBlock>
    )
}