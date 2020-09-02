import React from 'react';
import styled from 'styled-components'
import {  MainContent } from '~/styles/BaseStyle';
import { CreateRoomRequest, RoomListDto } from '~/types/chatting';
import { UserResponseDto } from '~/types/user';
import { BASE_IMG_URL } from '~/constants';
const Wrapper = styled(MainContent)`
    & .preview {
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
`;

interface Props {
    roomList: Array<RoomListDto>;
    intoRoom(param: CreateRoomRequest): void;
}

interface RoomRowProps {
    onDoubleClick(): void;
    room_name: string;
    roomImg: string;
    last_chat: string;
}

const RoomRow: React.FC<RoomRowProps> = (props) => {
    const {onDoubleClick, room_name, roomImg, last_chat} = props;
    return (
        <li onDoubleClick={onDoubleClick}>
            <img src={roomImg || BASE_IMG_URL} alt="profile Image"/>
            <p><b>{room_name}</b></p>
            <p className="preview">{last_chat}</p>
        </li>
    )
}

const Content: React.FC<Props> = (props) => {
    const {intoRoom, roomList} = props;
    const onDoubleClick = (room: RoomListDto) => {
        const participant:Array<UserResponseDto> = [];
        intoRoom({...room, participant});
    }
    const renderRoomList = roomList.map(room => <RoomRow {...room} roomImg={BASE_IMG_URL} onDoubleClick={() => onDoubleClick(room)} key={room.identifier}/>)

    return(
        <Wrapper>
            {renderRoomList}
        </Wrapper>
    )
}

export default Content;