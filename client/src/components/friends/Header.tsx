import React, {useState} from 'react';
import {  MainHeader, TitleBlock } from '~/styles/BaseStyle';
import { FindFriendWindow } from '~/components/friends';

interface Props {

}


const Header: React.FC<Props> = () => {
    const [isopenFindFriend, openFindFriend] = useState(false);
    const showFindFriend = isopenFindFriend ? 
        <FindFriendWindow onClose={()=>openFindFriend(false)} overlayClose={false}/>:null;
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