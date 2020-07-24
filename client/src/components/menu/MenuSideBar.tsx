import React from 'react';
import { SideBar } from '~/styles/BaseStyle';
const MenuSideBar: React.FC = () => {
    return (
        <SideBar>
            <ul>
                <li title="친구"><i className="fas fa-user"/></li>
                <li title="채팅"><i className="fas fa-comment"/></li>
                <li title="로그아웃"><i className="fas fa-sign-out-alt"/></li>
            </ul>
        </SideBar>
    );
}


export default MenuSideBar;