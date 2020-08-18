import React, { useState, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { MyChat, FriendChat, FriendChatWithThumbnail } from '~/components/chattingRoom/ChatBlock';

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: #b2c7d9;
`;
const Header = styled.header`
    width: 100%;
	background-color: #a9bdce;
	height: 50px;
    & span{
        display: inline-block;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        margin-left: 10px;
        margin-top: 10px;
    }
    & button{
        font-size: 20px;
        padding: 10px 10px 10px 30px;
        background-color: #a9bdce;
        outline: none;
        cursor: pointer;
        &:hover {
            color: #dcdcdc;
        }
    }
`
const Content = styled.main`
    position: absolute;
	top: 50px;
    bottom: 65px;
	left: 0px;
    right: 0px;
	overflow: auto;
    width: 100%;

`;



const Footer = styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
    padding: 6px;
    z-index: 100;
    background-color: #eeeeee;
    & form {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        & textarea, button {
            display: inline-block;
            border: none;
            outline: none;
        }
        & textarea {
            width: 100%;
            resize: none;
            height: 100%;
            margin: 0;
            padding: 5px 20px;
        }
        & button {
            width: 50px;
            height: 40px;
            background: #ffeb33;
        }
    }
    
`;

interface ChatProps {
    sendUserId : number;
    msg : string;
}

const ChattingRoom:React.FC = () => {
    const [ message, setMessage ] = useState(""); 
    const chatList:Array<ChatProps> = [
        {
            sendUserId: 1, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
        {
            sendUserId: 1, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
        {
            sendUserId: 2, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
        {
            sendUserId: 2, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
        {
            sendUserId: 1, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
        {
            sendUserId: 2, msg:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
        },
    ]
    const [ chatting, setChatting ] = useState(chatList);

    var prevSend = -1;
    const renderChatting = chatting.map(chat => {
        const isPrevSending = prevSend === chat.sendUserId;
        prevSend = chat.sendUserId;
        if(chat.sendUserId === 1){
            return <MyChat msg={chat.msg}/>;
        }
        if(isPrevSending){
            return <FriendChat msg={chat.msg}/>;
        }
        return <FriendChatWithThumbnail msg={chat.msg}/>;
    })
    
    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setMessage(event.target.value);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setChatting([...chatting, {sendUserId: 1, msg: message}]);
        setMessage("");
    }
    const onCtrlEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.ctrlKey){
            setChatting([...chatting, {sendUserId: 2, msg: message}]);
            setMessage("");
        }
    }
    return(
        <Wrapper>
            <Header>
                <button type="button"><i className="fas fa-arrow-left"/></button>
                <span>Web Kakao Interface</span>
            </Header>
            <Content>
                {renderChatting}
            </Content>
            <Footer>
                <div>
                    <form onSubmit={onSubmit}>
                        <textarea value={message} autoFocus={true} onChange={onMessageChange} onKeyPress={onCtrlEnterPress}/>
                        <button type="submit">전송</button>
                    </form>
                </div>
            </Footer>
        </Wrapper>
    )
}

export default ChattingRoom;