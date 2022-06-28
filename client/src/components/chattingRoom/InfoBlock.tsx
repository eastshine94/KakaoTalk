import React from 'react';
import styled from 'styled-components';
import { BASE_IMG_URL } from '~/constants';
import { UserResponseDto } from '~/types/user';

const BorderBlock = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  padding: 13px 0;
  & span {
    position: relative;
    display: inline-block;
    background-color: #b2c7d9;
    padding: 0 10px;
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 2%;
    top: 50%;
    width: 96%;
    height: 1px;
    background-color: #727b83;
  }
`;
const WarningAreaBlock = styled.div`
  width: 100%;
  height: 100px;
`;
const NotFriendBlock = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 200;
  & div {
    width: 96%;
    opacity: 0.9;
    background: #fff;
    color: #000;
    margin: 0 auto;
    margin-bottom: 10px;
    @media only screen and (max-width: 960px) {
      width: 90%;
    }
  }
`;
const ActionBlock = styled.div`
  display: flex;
  justify-content: center;
  & span {
    display: block;
    width: 33%;
    padding: 7px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      background: #eeeeee;
    }
  }
`;
const WarningBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 50px;

  & p {
    display: block;
  }

  & i {
    display: block;
    font-size: 26px;
    color: red;
    margin-right: 10px;
  }
`;
const DownBtnWrapper = styled.div`
  position: fixed;
  bottom: 70px;
  right: 30px;
  z-index: 200;
  & i {
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    background: #6e6e6e;
    color: #fff;
    font-size: 20px;
    &:hover {
      cursor: pointer;
      border: 1px solid #000;
    }
  }
`;
const MsgNotificationWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 70px;
  right: 30px;
  z-index: 200;
  width: 96%;
  border-radius: 10px;
  padding: 10px;
  background: #6e6e6e;
  &:hover {
    cursor: pointer;
    border: 1px solid #000;
  }

  & i {
    display: block;
    color: #fff;
    text-align: right;
    font-size: 20px;
  }
  @media only screen and (max-width: 960px) {
    width: 90%;
  }
`;
const NotificationBlockWrapper = styled.div`
  position: relative;
  width: 95%;
  padding-left: 23px;
  display: flex;
  & img {
    position: absolute;
    left: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 8px;
    margin-right: 10px;
  }
  & span {
    display: inline-block;
    color: #fff;
    overflow: hidden;

    &.name {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100px;
      color: #bebebe;
      margin-right: 10px;
    }
    &.msg {
      word-wrap: break-word;
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      width: 90%;
    }
  }
`;

interface SeparationBlockProps {
  content: string;
}

interface NotFriendWariningProps {
  onAddFriendClick(): void;
}

interface DownProps {
  onDownClick(): void;
}

interface MessageNotificationProp extends DownProps {
  user?: UserResponseDto;
  msg: string;
}

// 날짜를 표시하는 등 채팅방의 경계를 나타냅니다.
export const SeparationBlock: React.FC<SeparationBlockProps> = ({
  content
}) => {
  return (
    <BorderBlock>
      <span>{content}</span>
    </BorderBlock>
  );
};

// 친구가 아닐 경우, 상단에 경고 창이 뜨게 됩니다.
export const NotFriendWarning: React.FC<NotFriendWariningProps> = props => {
  const { onAddFriendClick } = props;
  return (
    <WarningAreaBlock>
      <NotFriendBlock>
        <ActionBlock>
          <span onClick={onAddFriendClick}>
            <i className="fas fa-user-plus" /> 추가
          </span>
        </ActionBlock>
        <WarningBlock>
          <i className="fas fa-exclamation-triangle" />
          <p>
            {' '}
            친구로 등록되지 않은 사용자입니다. 금전 요구 등으로 인한 피해를 입지
            않도록 주의해주세요.
          </p>
        </WarningBlock>
      </NotFriendBlock>
    </WarningAreaBlock>
  );
};

// 채팅방의 스크롤이 일정 이상 올라가면 나타나는 Down 버튼입니다.
export const DownBtn: React.FC<DownProps> = props => {
  const { onDownClick } = props;
  return (
    <DownBtnWrapper onClick={onDownClick}>
      <i className="fas fa-angle-down" />
    </DownBtnWrapper>
  );
};

// 채팅방의 스크롤이 일정 이상 올라가 있는 상태에서, 메시지가 도착하면 이를 알려주는 컴포넌트 입니다.
export const MessageNotification: React.FC<MessageNotificationProp> = props => {
  const { msg } = props;
  const user = props.user as UserResponseDto;
  const { onDownClick } = props;
  return (
    <MsgNotificationWrapper onClick={onDownClick}>
      <NotificationBlockWrapper>
        <img src={user.profile_img_url || BASE_IMG_URL} alt="profile image" />
        <span className="name">{user.name}</span>
        <span className="msg">{msg}</span>
      </NotificationBlockWrapper>
      <i className="fas fa-angle-down" />
    </MsgNotificationWrapper>
  );
};
