import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { SideBar, Notification } from '~/styles/BaseStyle';
import { PAGE_PATHS } from '../../constants';
import { RoomListResponse } from '~/types/chatting';

const Menu = styled(NavLink)`
    display: inline-block;
    width : 100%;
    &.active {
        pointer-events: none;
        & li{
            color: black;
        }
    }
    & li {
        position: relative;
        & ${Notification} {
            top: 5px;
            right: 20px;
            font-size: 12px;
        }
    }
`; 

interface Props {
    roomList: Array<RoomListResponse>;
    logout(): void;
}

const MenuSideBar: React.FC<Props> = ({roomList, logout}) => {
    const totalNotReadNum = roomList.reduce((acc, curr) => {
        return acc + curr.not_read_chat;
    }, 0);
    const showNotReadChat = totalNotReadNum > 0 ? <Notification>{totalNotReadNum}</Notification> : null;
    const onLogoutClick = () => {
        const isLogout = confirm("로그아웃 하시겠습니까?");
        if(isLogout) logout();
    };
    return (
        <SideBar>
            <ul>
                <Menu to={PAGE_PATHS.FRIENDS}><li title="친구"><i className="fas fa-user"/></li></Menu>
                <Menu activeClassName="active" to={PAGE_PATHS.CHATTING}>
                    <li title="채팅">
                        <i className="fas fa-comment"/>
                        {showNotReadChat}
                    </li>
                </Menu>
                <li title="로그아웃" onClick={onLogoutClick}><i className="fas fa-sign-out-alt"/></li>
            </ul>
        </SideBar>
    );
}


export default MenuSideBar;