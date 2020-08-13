import React from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
import { FindFriendWindow } from '~/components/friends';

const Header: React.FC = () => {
    return(
        <React.Fragment>
            <FindFriendWindow/>
            <MainHeader>
                <TitleBlock>
                    <h2>친구</h2>
                    <i className="fas fa-user-plus"/>
                </TitleBlock>
                <input placeholder="이름 검색"/>                        
            </MainHeader>
        </React.Fragment>
        
    )
}

export default Header;