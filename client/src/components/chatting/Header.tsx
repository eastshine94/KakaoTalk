import React, { ChangeEvent } from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';

interface Props {
    changeSearch(value: string):void
}


const Header: React.FC<Props> = (props) => {
    const { changeSearch } = props;

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        changeSearch(event.target.value);
    }

    return(
        <MainHeader>
            <TitleBlock>
                <h2>채팅</h2>
                <i className="fas fa-comment-medical"/>
            </TitleBlock>
            <input placeholder="채팅방 이름, 참여자 검색" onChange={onSearchChange}/>                        
        </MainHeader>
    )
}

export default Header;