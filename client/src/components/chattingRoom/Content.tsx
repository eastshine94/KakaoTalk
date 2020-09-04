import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import { MyChat, FriendChat, FriendChatWithThumbnail } from '~/components/chattingRoom/ChatBlock';
import { ChattingResponseDto } from '~/types/chatting';
import { UserData } from '~/types/user';

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
    userData: UserData;
    chattingList: Array<ChattingResponseDto>;
}

const Content: React.FC<Props> = (props) => {
    const { userData, chattingList } = props;
    const messageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messageRef.current!.scrollTop = messageRef.current!.scrollHeight;
    },[chattingList])
    var prevSend = -1;
    const renderChatting = chattingList.map(chat => {
        const isPrevSending = prevSend === chat.send_user_id;
        prevSend = chat.send_user_id;
        if(chat.send_user_id === userData.id){
            return <MyChat msg={chat.message} key={chat.id}/>;
        }
        if(isPrevSending){
            return <FriendChat msg={chat.message} key={chat.id}/>;
        }
        return <FriendChatWithThumbnail msg={chat.message} key={chat.id}/>;
    })
    return(
        <Wrapper ref={messageRef}>
            {renderChatting}
        </Wrapper>
    )
}

export default Content;