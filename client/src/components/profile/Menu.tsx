import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  border-top: 1px solid #fff;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  & div {
    text-align: center;
    cursor: pointer;
    & i {
      color: #fff;
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
`;

interface Props {
  isMe: boolean;
  isFriend: boolean;
  onChatClick(): void;
  onAddFriendClick(): void;
}

const Menu: React.FC<Props> = props => {
  const { isMe, isFriend, onChatClick, onAddFriendClick } = props;
  return (
    <Wrapper>
      {isFriend || isMe ? (
        <div onClick={onChatClick}>
          <i className="fas fa-comment" />
          <p>{isMe ? '나와의 채팅' : '1:1 채팅'}</p>
        </div>
      ) : (
        <div onClick={onAddFriendClick}>
          <i className="fas fa-user-plus" />
          <p>친구 추가</p>
        </div>
      )}
    </Wrapper>
  );
};

export default Menu;
