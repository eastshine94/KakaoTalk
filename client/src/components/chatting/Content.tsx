import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {  MainContent } from '~/styles/BaseStyle';
import { CreateRoomRequest, RoomListDto } from '~/types/chatting';
import { UserData, UserResponseDto } from '~/types/user';
import { BASE_IMG_URL } from '~/constants';
import { findUserUsingId } from '~/apis/user';

const Wrapper = styled(MainContent)`
    & .preview {
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
`;

interface Props {
    userState: UserData;
    intoRoom(param: CreateRoomRequest): void;
    showProfile(userData: UserResponseDto): void;
}

interface RoomRowProps {
    onDoubleClick(): void;
    onImgClick(): void;
    room_name: string;
    roomImg: string;
    last_chat: string;
}

const RoomRow: React.FC<RoomRowProps> = (props) => {
    const { onImgClick, onDoubleClick, room_name, roomImg, last_chat } = props;
    return (
        <li onDoubleClick={onDoubleClick}>
            <img src={roomImg} alt="profile Image" onClick={onImgClick}/>
            <p><b>{room_name}</b></p>
            <p className="preview">{last_chat}</p>
        </li>
    )
}

const Content: React.FC<Props> = (props) => {
    const {intoRoom, showProfile, userState} = props;
    const roomList = userState.room_list;
    const friendList = userState.friends_list;
    
    let [rooms, setRooms] = useState([] as Array<RoomListDto>);
    useEffect(() => {
        const getParticipants = async() => {
            const getRoomList = await Promise.all(roomList.map(async(room) => {
                const participant = await Promise.all(room.participant.map(async(val) => {
                   const findParticipant = friendList.find(friend => friend.id === val);
                   if(!findParticipant){
                       const user = await findUserUsingId(val);
                       return user;
                   }
                   return findParticipant;
                }))
                return {...room, participant}
            }));
            await setRooms([...getRoomList]);
        }
        getParticipants();
    },[roomList]);

    const onDoubleClick = (room: RoomListDto) => {
        intoRoom({...room});
    }
    const renderRoomList = rooms.map(room => {
        if(room.type==="individual"){
            const participantWithoutMe = room.participant.length > 1 ? 
            room.participant.filter(person => person.id !== userState.id) : 
            room.participant;
            return <RoomRow 
                room_name={ room.room_name || participantWithoutMe[0].name} 
                roomImg={participantWithoutMe[0].profile_img_url||BASE_IMG_URL}
                last_chat={room.last_chat} 
                onImgClick={() => showProfile(participantWithoutMe[0])}
                onDoubleClick={() => onDoubleClick(room)} 
                key={room.room_id}
                
            />
        }
        return null;
    })

    return(
        <Wrapper>
            {renderRoomList}
        </Wrapper>
    )
}

export default Content;