import React, {useState, ChangeEvent} from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
import { FindFriendWindow } from '~/components/friends';

interface Props {
    changeSearch(value: string):void
}


const Header: React.FC<Props> = ({changeSearch}) => {
    const [isopenFindFriend, openFindFriend] = useState(false);

    // 친구 찾기 창(modal)
    const showFindFriend = isopenFindFriend ? 
        <FindFriendWindow onClose={()=>openFindFriend(false)} overlayClose={false}/>:null;

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        changeSearch(event.target.value);
    }
    return(
        <React.Fragment>
            {showFindFriend}
            <MainHeader>
                <TitleBlock>
                    <h2>친구</h2>
                    <i className="fas fa-user-plus" title="친구 추가" onClick={()=>openFindFriend(true)}/>
                </TitleBlock>
                <input placeholder="이름 검색" onChange={onSearchChange}/>                        
            </MainHeader>
        </React.Fragment>
        
    )
}

export default Header;