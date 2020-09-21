import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Modal from '~/pages/Modal';
import {MainContent} from '~/styles/BaseStyle';
import { BASE_IMG_URL } from '~/constants';
import { UserData } from '~/types/user';


const Wrapper = styled.div`
    position: relative;
    width: 380px;
    height: 90vh;
    border: 1px solid #969696;
    margin: auto;
    color: #000;
    background: #fff;
`;
const HeaderWrapper = styled.div`
    width: 100%;
    height: 120px;
    & h4 {
        padding: 25px 20px;
        font-size: 18px;
        font-weight: 600;
    }
    & input {
        display: block;
        outline: none;
        border: 1px solid #969696; 
        border-radius: 20px;
        background-color: #f6f6f7;
        width: 90%;
        padding: 8px 15px;
        margin: 0 auto;
        &:focus {
            &::placeholder {
                color: #f6f6f7;
            }
        }
    }
`;
const ContentWrapper = styled(MainContent)`
    position: absolute;
    margin: 0;
    top: 120px;
    bottom: 80px;
    left: 0px;
    right: 0px;
    width: 100%;
    overflow: auto;

    & h6 {
        font-size: 12px;
        color: #b4b4b4;
        padding: 10px 20px;
    }
    & li {
        & img {
            top: 10px;
            cursor: none;
        }
    }
`;
const FooterWrapper = styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%; 
    height: 80px;
    border-top: 1px solid #dcdcdc;
    text-align: right;
    & button {
        position: relative;
        transform: translateY(50%);
        border: 1px solid #dcdcdc;
        background: #fff;
        padding: 10px 25px;
        margin-right: 10px;
        cursor: pointer;
        &.confirm {
            background: #fee500;
            &:hover{
                background: #fada0a;
            }
        }
        &.cancel{
            &:hover{
                background: #f5f5f5;
            }
        }
    }
`;
const CancelIcon = styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
`


interface Props {
    userState: UserData
    onClose(): void;
}

interface HeaderProps {
    setSearch(search: string): void; 
}

interface ContentProps {
    search: string;
    userState: UserData;
}

interface FriendRowProps {
    name: string;
    profile_img_url: string,
}

const Header: React.FC<HeaderProps> = (props) => {
    const { setSearch } = props;
    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const searchRemoveBlank = event.target.value.replace(/ /g,"");
        setSearch(searchRemoveBlank);
    }
    return(
        <HeaderWrapper>
            <h4>대화 상대 선택</h4>
            <input placeholder="이름 검색" onChange={onSearchChange}/>  
        </HeaderWrapper>
    )
}

const Content: React.FC<ContentProps> = (props) => {
    const { search, userState } = props;
    const reg_exp = new RegExp(`^.*${search}.*$`);
    const friendsList = userState.friends_list.sort((a,b)=>{
        return a.name.localeCompare(b.name);
    });
    const searchedFriends = friendsList.filter(friend => {
        return friend.name.replace(/ /g,"").match(reg_exp);
    });
    const renderFriends = searchedFriends.map(friend => {        
        return (
            <FriendRow 
                {...friend} 
                key={friend.id} 
            />
        )
    });
    return(
        <ContentWrapper>
            <h6>{renderFriends.length > 0 ? `친구 ${renderFriends.length}` : ""}</h6>
            {renderFriends}
        </ContentWrapper>
    )
}

const FriendRow:React.FC<FriendRowProps> = (props) => {
    const {name, profile_img_url} = props;
    return(
        <li>
            <img src={profile_img_url||BASE_IMG_URL} alt="profile Image"/>
            <p><b>{name}</b></p>
        </li>
    )
}


const Footer: React.FC<{onClose(): void}> = (props) => {
    const { onClose } = props;
    return(
        <FooterWrapper>
            <button className="confirm">확인</button>
            <button className="cancel" onClick={onClose}>취소</button>
        </FooterWrapper>
    )
}

const NewChattingWindow: React.FC<Props> = (props) => {
    const { userState, onClose } = props;
    const [ search, setSearch ] = useState("");
    return(
        <Modal onClose ={onClose}>
            <Wrapper>
                <CancelIcon className="fas fa-times" title="닫기" onClick={onClose}/>
                <Header setSearch={setSearch}/>
                <Content userState={userState} search={search}/>
                <Footer onClose ={onClose}/>
            </Wrapper>        
        </Modal>
    )
}


export default NewChattingWindow;