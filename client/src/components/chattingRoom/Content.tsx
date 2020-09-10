import React from 'react';
import styled from 'styled-components';
import { MyChat, FriendChat, FriendChatWithThumbnail } from '~/components/chattingRoom/ChatBlock';
import { ChattingResponseDto } from '~/types/chatting';
import { UserResponseDto } from '~/types/user';

const Wrapper = styled.main`
    position: absolute;
	top: 50px;
    bottom: 65px;
	left: 0px;
    right: 0px;
	overflow: auto;
    width: 100%;
`;

interface Props {
    myId: number;
    participant: Array<UserResponseDto>;
    chattingList: Array<ChattingResponseDto>;
    messageRef: React.RefObject<HTMLDivElement>;
    showProfile(userData: UserResponseDto): void;
}

const Content: React.FC<Props> = (props) => {
    const { myId, chattingList, participant, messageRef, showProfile } = props;

    const renderChatting = chattingList.map((chat,idx) => {
        const createdAt = new Date(chat.created_at);
        const localeTime = createdAt.toLocaleTimeString();
        const removeSecond = localeTime.substring(0,localeTime.length-3);
        const senderId = chat.send_user_id;

        const prevChat = idx >= 1 ? chattingList[idx-1] : undefined;
        const prevCreatedAt = prevChat ? new Date(prevChat.created_at).toLocaleTimeString() : "";
        const prevRemoveSecond = prevChat? prevCreatedAt.substring(0, prevCreatedAt.length-3) : "";
        const isPrevSender = prevChat? prevChat.send_user_id === senderId : false;
        const sender = participant.find(person => person.id === senderId) as UserResponseDto;
 
        if(idx === chattingList.length - 1){
            if(senderId === myId){
                return <MyChat msg={chat.message} localeTime={removeSecond} key={chat.id}/>;
            }
            if(isPrevSender){
                return <FriendChat msg={chat.message} localeTime={removeSecond} key={chat.id}/>;
            }
            return <FriendChatWithThumbnail msg={chat.message} user={sender} localeTime={removeSecond} onImgClick={ () => showProfile(sender)} key={chat.id}/>;
        }
        const afterSender = chattingList[idx+1];
        const afterCreateAt = new Date(afterSender.created_at).toLocaleTimeString();
        const afterRemoveSecond = afterCreateAt.substring(0, afterCreateAt.length-3);
        const time = (afterSender.send_user_id !== senderId || !(afterRemoveSecond === removeSecond)) ? removeSecond : "";
        if(senderId === myId){
            return <MyChat msg={chat.message} localeTime={time} key={chat.id}/>;
        }
        if(isPrevSender && prevRemoveSecond === removeSecond){
            return <FriendChat msg={chat.message} localeTime={time} key={chat.id}/>;            
        }
        return <FriendChatWithThumbnail msg={chat.message} user={sender} localeTime={time} onImgClick={ () => showProfile(sender)} key={chat.id}/>;
        
    })
    return(
        <Wrapper ref={messageRef}>
            {renderChatting}
        </Wrapper>
    )
}

export default Content;