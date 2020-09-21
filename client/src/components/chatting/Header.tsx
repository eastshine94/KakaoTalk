import React, { useState, ChangeEvent} from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
import NewChattingWindow from './NewChattingWindow';
import { UserData } from '~/types/user';

interface Props {
    userState: UserData;
    changeSearch(value: string):void
}


const Header: React.FC<Props> = (props) => {
    const { userState, changeSearch } = props;
    const [isOpenNewChatting, openNewChatting] = useState(false);
    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        changeSearch(event.target.value);
    }
    const showCreateNewChatting = isOpenNewChatting ? <NewChattingWindow userState={userState} onClose={()=>openNewChatting(false)}/> : null;
    return(
        <React.Fragment>
            {showCreateNewChatting}
            <MainHeader>
                <TitleBlock>
                    <h2>채팅</h2>
                    <i className="fas fa-comment-medical" title="새로운 채팅" onClick={() => openNewChatting(true)}/>
                </TitleBlock>
                <input placeholder="채팅방 이름, 참여자 검색" onChange={onSearchChange}/>                        
            </MainHeader>
        </React.Fragment>
    )
}

export default Header;