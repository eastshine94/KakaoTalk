import React from 'react';
import styled from 'styled-components';
import { Socket } from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import { SideBar, Notification } from '~/styles/BaseStyle';
import { PAGE_PATHS } from '../../constants';
import { RoomListResponse } from '~/types/chatting';

const Menu = styled(NavLink)`
  display: inline-block;
  width: 100%;
  &.active {
    pointer-events: none;
    & li {
      color: black;
    }
  }
  & li {
    position: relative;
    & ${Notification} {
      top: 7px;
      left: 55px;
      font-size: 12px;
    }
  }
`;

interface Props {
  roomList: Array<RoomListResponse>;
  socket: typeof Socket;
  logout(): void;
}

const MenuSideBar: React.FC<Props> = ({ roomList, socket, logout }) => {
  // 읽지 않은 총 채팅 수를 의미합니다.
  const totalNotReadNum = roomList.reduce((acc, curr) => {
    return acc + curr.not_read_chat;
  }, 0);
  const showNotReadChat =
    totalNotReadNum > 0 ? (
      <Notification>
        {totalNotReadNum <= 300 ? totalNotReadNum : '300+'}
      </Notification>
    ) : null;
  const onLogoutClick = () => {
    const isLogout = confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      socket.close();
      logout();
    }
  };
  return (
    <SideBar>
      <ul>
        <Menu to={PAGE_PATHS.FRIENDS}>
          <li title="친구">
            <i className="fas fa-user" />
          </li>
        </Menu>
        <Menu activeClassName="active" to={PAGE_PATHS.CHATTING}>
          <li title="채팅">
            <i className="fas fa-comment" />
            {showNotReadChat}
          </li>
        </Menu>
        <li title="로그아웃" onClick={onLogoutClick}>
          <i className="fas fa-sign-out-alt" />
        </li>
      </ul>
    </SideBar>
  );
};

export default MenuSideBar;
