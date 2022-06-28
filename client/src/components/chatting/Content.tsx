import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainContent } from '~/styles/BaseStyle';
import { CreateRoomRequest, RoomListDto } from '~/types/chatting';
import { UserData, UserResponseDto } from '~/types/user';
import { BASE_IMG_URL } from '~/constants';
import { findUserUsingId } from '~/apis/user';
import { Notification } from '~/styles/BaseStyle';
const Wrapper = styled(MainContent)`
  & li {
    padding: 10px 20px 10px 180px;
  }
  & .preview {
    position: relative;
    height: 40px;
    word-wrap: break-word;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-right: 80px;
    & ${Notification} {
      top: 0;
      right: 5px;
      padding: 3px;
    }
  }
  & .room-block-top {
    position: relative;
    & span {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

interface Props {
  search: string;
  userState: UserData;
  intoRoom(param: CreateRoomRequest): void;
  showProfile(userData: UserResponseDto): void;
}

// 채팅방 목록 Props
interface RoomRowProps {
  onDoubleClick(): void;
  onImgClick(): void;
  room_name: string;
  roomImg: string;
  updatedAt: Date;
  last_chat: string;
  not_read_chat: number;
}

// 채팅방 목록
const RoomRow: React.FC<RoomRowProps> = props => {
  const {
    onImgClick,
    onDoubleClick,
    room_name,
    updatedAt,
    roomImg,
    last_chat,
    not_read_chat
  } = props;
  // 마지막 채팅 시간
  const getUpdatetAt = (date: Date) => {
    const today = new Date();
    const updateDate = new Date(date);
    const localeDate = updateDate.toLocaleDateString();
    if (today.toLocaleDateString() === localeDate) {
      const localeTime = updateDate.toLocaleTimeString();
      return localeTime.substring(0, localeTime.length - 3);
    }
    return localeDate;
  };

  // 읽지 않은 채팅 수
  const showNotReadChat =
    not_read_chat > 0 ? (
      <Notification>
        {not_read_chat <= 300 ? not_read_chat : '300+'}
      </Notification>
    ) : null;

  return (
    <li onDoubleClick={onDoubleClick}>
      <img src={roomImg} alt="profile Image" onClick={onImgClick} />
      <p className="room-block-top">
        <b>{room_name}</b>
        <span>{getUpdatetAt(updatedAt)}</span>
      </p>
      <p className="preview">
        {last_chat}
        {showNotReadChat}
      </p>
    </li>
  );
};

const Content: React.FC<Props> = props => {
  const { intoRoom, showProfile, userState, search } = props;
  const roomList = userState.room_list.sort((a, b) =>
    b.updatedAt.toLocaleString().localeCompare(a.updatedAt.toLocaleString())
  );
  const friendList = userState.friends_list;

  let [rooms, setRooms] = useState([] as Array<RoomListDto>);
  let [notFriends, setNotFriends] = useState([] as Array<UserResponseDto>);

  /**  채팅방 메뉴가 처음 rendering 되거나, 
    userState(내 정보, 친구 정보, 방 정보 등)이 바뀔 때, 채팅방 참가자 정보를 바꿈.*/
  useEffect(() => {
    const getParticipants = async () => {
      const getRoomList = await Promise.all(
        roomList.map(async room => {
          const participant = await Promise.all(
            room.participant.map(async val => {
              // 참가자가 나 자신인가?
              if (userState.id === val) return userState;
              // 참가자가 친구 목록에 있는가?
              const findParticipant = friendList.find(
                friend => friend.id === val
              );
              if (findParticipant) {
                return findParticipant;
              }
              // 참가자가 기존에 친구 아닌 목록에 있는가?
              const findNotFriends = notFriends.find(
                person => person.id === val
              );
              if (findNotFriends) {
                return findNotFriends;
              }
              // 서버에서 참가자 정보를 가져오고, 친구아님 목록에 추가합니다.
              const user = await findUserUsingId(val);
              await setNotFriends([...notFriends, user]);
              return user;
            })
          );
          return { ...room, participant };
        })
      );
      await setRooms([...getRoomList]);
    };
    getParticipants();
  }, [userState]);

  // 더블 클릭 시, 채팅방에 입장
  const onDoubleClick = (room: RoomListDto) => {
    intoRoom({ ...room });
  };
  const renderRoomList = rooms.map(room => {
    if (room.type === 'individual') {
      const participant =
        room.participant.length > 0 ? room.participant : [userState];
      // 채팅 참가자 중, 찾는 사람이 있는 방만 보여줍니다. 검색을 안하면 채팅방 전부 보여줌
      const reg_exp = new RegExp(`^.*${search}.*$`);
      const findRoom = participant.find(person => {
        return person.name.replace(/ /g, '').match(reg_exp);
      });
      if (!findRoom && !room.room_name.replace(/ /g, '').match(reg_exp)) {
        return null;
      }
      return (
        <RoomRow
          room_name={room.room_name || participant[0].name}
          roomImg={participant[0].profile_img_url || BASE_IMG_URL}
          updatedAt={room.updatedAt}
          last_chat={room.last_chat}
          not_read_chat={room.not_read_chat}
          onImgClick={() => showProfile(participant[0])}
          onDoubleClick={() => onDoubleClick(room)}
          key={room.room_id}
        />
      );
    }
    return null;
  });

  return <Wrapper>{renderRoomList}</Wrapper>;
};

export default Content;
