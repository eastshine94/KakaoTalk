import React from 'react';
import styled from 'styled-components';

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

const UserBlcok = styled.div`
    margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
`;

const Chat = styled.div`
    display: inline-block;
	padding: 7px 8px;
	border-radius: 4px;
	margin-bottom: 7px;
	box-shadow: 0px 1px 2px 0px #8FABC7;
    max-width: 70%;
`;

const RightBlock = styled.div`
    text-align: right;
    & ${Chat}{
        background-color: #ffec42;
        text-align: left;
    }
`;

const LeftBlock = styled.div`
    position: relative;
    padding-left: 50px;
    & ${Chat}{
        background-color: #fff;
    }
    & img {
        position: absolute;
        top: 3px;
        left: 0;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        float: left;
    }
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
const ChattingRoom:React.FC = () => {
    return(
        <Wrapper>
            <Header>
                <button type="button"><i className="fas fa-arrow-left"/></button>
                <span>Web Kakao Interface</span>
            </Header>
            <Content>
                <UserBlcok>
                    <RightBlock>
                        <div><Chat>채팅, 채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                    </RightBlock>
                </UserBlcok>
                <UserBlcok>
                    <LeftBlock>
                        <img src="/asset/base_profile.jpg" alt="thumbnail"/>
                        <div>홍길동</div>
                        <div><Chat>채팅, 채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                    </LeftBlock>
                </UserBlcok>
                <UserBlcok>
                    <RightBlock>
                        <div><Chat>채팅, 채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                    </RightBlock>
                </UserBlcok>
                <UserBlcok>
                    <RightBlock>
                        <div><Chat>채팅, 채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                        <div><Chat>채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅</Chat></div>
                    </RightBlock>
                </UserBlcok>
            </Content>
            <Footer>
                <div>
                    <form>
                        <textarea autoFocus={true} />
                        <button type="button">전송</button>
                    </form>
                </div>
            </Footer>
        </Wrapper>
    )
}

export default ChattingRoom;