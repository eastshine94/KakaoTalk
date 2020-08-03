import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { SideBar } from '~/styles/BaseStyle';
import { PAGE_PATHS } from '../../constants';

const Menu = styled(NavLink)`
    display: inline-block;
    width : 100%;
    &.active {
        pointer-events: none;
        & li{
            color: black;
        }
    }
`; 

interface Props {
    logout(): void;
}

const MenuSideBar: React.FC<Props> = ({logout}) => {
    const onLogoutClick = () => {
        const isLogout = confirm("로그아웃 하시겠습니까?");
        if(isLogout) logout();
    };
    return (
        <SideBar>
            <ul>
                <Menu to={PAGE_PATHS.FRIENDS}><li title="친구"><i className="fas fa-user"/></li></Menu>
                <Menu activeClassName="active" to={PAGE_PATHS.CHATTING}><li title="채팅"><i className="fas fa-comment"/></li></Menu>
                <li title="로그아웃" onClick={onLogoutClick}><i className="fas fa-sign-out-alt"/></li>
            </ul>
        </SideBar>
    );
}


export default MenuSideBar;