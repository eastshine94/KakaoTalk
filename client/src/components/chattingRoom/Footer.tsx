import React, { useState, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
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
            &.canSubmit {
                cursor: pointer;
                pointer-events: all;
                color: #000;
            }
            &.cannotSubmit {
                pointer-events: none;
                color: #b4b4b4;
            }
        }
    }
    
`;

interface Props {
    onChatSumbmit(msg: string): void;
}
const Footer: React.FC<Props> = ({ onChatSumbmit }) => {
    const [ message, setMessage ] = useState("");
    const isCanSubmit = !!message.replace(/ |\n/g,"");
    const btnClassName = isCanSubmit ? "canSubmit": "cannotSubmit";
    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setMessage(value);
    }
    const requestSubmit = () => {
        if(isCanSubmit){
            onChatSumbmit(message);
            setMessage("");
        }
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        requestSubmit();
    }
    const onEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(!event.shiftKey && event.key === "Enter"){
            event.preventDefault();
            requestSubmit();
        }
    }
    return(
        <Wrapper>
            <form onSubmit={onSubmit}>
                <textarea value={message} autoFocus={true} onChange={onMessageChange} onKeyPress={onEnterPress}/>
                <button className={btnClassName} type="submit">전송</button>
            </form>
        </Wrapper>
    )
}

export default Footer;