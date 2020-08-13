import React, {useState} from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
import { FindFriendWindow } from '~/components/friends';
import { UserData } from '~/types/user';

interface Props {
    userData: UserData;
}


const Header: React.FC<Props> = ({userData}) => {
    const [isopenFindFriend, openFindFriend] = useState(false);
    const showFindFriend = isopenFindFriend ? 
        <FindFriendWindow userData={userData} onClose={()=>openFindFriend(false)} overlayClose={false}/>:null;
    return(
        <React.Fragment>
            {showFindFriend}
            <MainHeader>
                <TitleBlock>
                    <h2>친구</h2>
                    <i className="fas fa-user-plus" onClick={()=>openFindFriend(true)}/>
                </TitleBlock>
                <input placeholder="이름 검색"/>                        
            </MainHeader>
        </React.Fragment>
        
    )
}

export default Header;