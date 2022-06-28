import React from 'react';
import styled from 'styled-components';
import { MainContent } from '~/styles/BaseStyle';
import { UserData, UserResponseDto } from '~/types/user';
import { CreateRoomRequest } from '~/types/chatting';
import { BASE_IMG_URL } from '~/constants';

const MyProfileBlock = styled.div`
  position: relative;
  padding: 25px 10px 25px 185px;
  & img {
    position: absolute;
    top: 18px;
    left: 120px;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    cursor: pointer;
  }
  & p {
    color: #707070;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 19px;
    font-size: 12px;
    & b {
      color: #000;
      font-weight: bold;
      font-size: 14px;
    }
  }
  &:hover {
    background-color: #eaeaeb;
  }
`;

const FriendsBorder = styled.div`
  border-top: 0.5px solid #dcdcdc;
  margin: 10px 20px 0 120px;
  padding-top: 10px;
  & p {
    font-size: 12px;
    color: #b4b4b4;
  }
`;

interface Props {
  search: string;
  userData: UserData;
  showProfile(userData: UserResponseDto): void;
  showChattingRoom(param: CreateRoomRequest): void;
}
interface FriendRowProps {
  name: string;
  status_msg: string;
  profile_img_url: string;
  profileImgClick(): void;
  onDoubleClick(): void;
}

// 친구 목록
const FriendRow: React.FC<FriendRowProps> = props => {
  const { name, status_msg, profile_img_url } = props;
  const { profileImgClick, onDoubleClick } = props;
  return (
    <li onDoubleClick={onDoubleClick}>
      <img
        src={profile_img_url || BASE_IMG_URL}
        alt="profile Image"
        onClick={profileImgClick}
      />
      <p>
        <b>{name}</b>
      </p>
      <p>{status_msg}</p>
    </li>
  );
};

const Content: React.FC<Props> = ({
  search,
  userData,
  showProfile,
  showChattingRoom
}) => {
  // 검색된 친구들만 보여줍니다. 검색을 안 할 경우 모든 찬구를 보여줍니다.
  const searchRemoveBlank = search.replace(/ /g, '');
  const reg_exp = new RegExp(`^.*${searchRemoveBlank}.*$`);
  const friendsList = userData.friends_list.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const searchedFriends = friendsList.filter(friend => {
    return friend.name.replace(/ /g, '').match(reg_exp);
  });
  const renderFriends = searchedFriends.map(friend => {
    const myId = userData.id;
    const friendId = friend.id;
    const identifier =
      myId < friendId ? `${myId}-${friendId}` : `${friendId}-${myId}`;
    const roomObj: CreateRoomRequest = {
      type: 'individual',
      identifier,
      room_name: '',
      participant: [{ ...friend }]
    };

    return (
      <FriendRow
        {...friend}
        key={friend.id}
        profileImgClick={() => showProfile(friend)}
        onDoubleClick={() => showChattingRoom(roomObj)}
      />
    );
  });

  const onMyBlockDoubleClick = () => {
    const roomObj: CreateRoomRequest = {
      type: 'individual',
      identifier: `${userData.id}-${userData.id}`,
      room_name: '',
      participant: [userData]
    };
    showChattingRoom(roomObj);
  };
  return (
    <MainContent>
      {search ? null : (
        <MyProfileBlock onDoubleClick={onMyBlockDoubleClick}>
          <img
            src={userData.profile_img_url || BASE_IMG_URL}
            alt="profile Image"
            onClick={() => showProfile(userData)}
          />
          <p>
            <b>{userData.name}</b>
          </p>
          <p>{userData.status_msg}</p>
        </MyProfileBlock>
      )}
      <FriendsBorder>
        <p>{`친구 ${renderFriends.length}`}</p>
      </FriendsBorder>
      <ul>{renderFriends}</ul>
    </MainContent>
  );
};

export default Content;
