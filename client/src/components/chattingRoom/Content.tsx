import React, {useRef, useEffect} from 'react';
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
    showProfile(userData: UserResponseDto): void;
}

const Content: React.FC<Props> = (props) => {
    const { myId, chattingList, participant, showProfile } = props;
    const messageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messageRef.current!.scrollTop = messageRef.current!.scrollHeight;
    },[chattingList])
    let prevSend = -1;
    const renderChatting = chattingList.map(chat => {
        const senderId = chat.send_user_id;
        const isPrevSending = prevSend === senderId;
        prevSend = senderId;
        if(senderId === myId){
            return <MyChat msg={chat.message} key={chat.id}/>;
        }
        if(isPrevSending){
            return <FriendChat msg={chat.message} key={chat.id}/>;
        }
        const sender = participant.find(person => person.id === senderId) as UserResponseDto;
        return <FriendChatWithThumbnail msg={chat.message} user={sender} onImgClick={ () => showProfile(sender)} key={chat.id}/>;
    })
    return(
        <Wrapper ref={messageRef}>
            {renderChatting}
        </Wrapper>
    )
}

export default Content;