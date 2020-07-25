import React from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
const Header: React.FC = () => {
    return(
        <MainHeader>
            <TitleBlock>
                <h2>채팅</h2>
                <i className="fas fa-comment-medical"/>
            </TitleBlock>
            <input placeholder="채팅방 이름"/>                        
        </MainHeader>
    )
}

export default Header;