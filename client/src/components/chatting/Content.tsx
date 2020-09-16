import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {  MainContent } from '~/styles/BaseStyle';
import { CreateRoomRequest, RoomListDto } from '~/types/chatting';
import { UserData, UserResponseDto } from '~/types/user';
import { BASE_IMG_URL } from '~/constants';
import { findUserUsingId } from '~/apis/user';
import { Notification } from '~/styles/BaseStyle';
const Wrapper = styled(MainContent)`
    & li {
        padding: 10px 20px 10px 80px;
    }
    & .preview {
        position: relative;
        height: 40px;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        padding-right: 80px;
        & ${Notification}{
            top: 0;
            right: 5px;
            padding: 3px;
        }
    }
    & .room-block-top{
        position: relative;
        & span{
            position: absolute;
            top: 0;
            right: 0;
        }
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
    updatedAt: Date;
    last_chat: string;
    not_read_chat: number;
}

const RoomRow: React.FC<RoomRowProps> = (props) => {
    const { onImgClick, onDoubleClick, room_name, updatedAt, roomImg, last_chat, not_read_chat } = props;
    const getUpdatetAt = (date: Date) => {
        const today = new Date();
        const updateDate = new Date(date);
        const localeDate = updateDate.toLocaleDateString();
        if(today.toLocaleDateString() === localeDate){
            const localeTime = updateDate.toLocaleTimeString();
            return localeTime.substring(0,localeTime.length-3);
        }
        return localeDate;
    } 
    getUpdatetAt(updatedAt);
    const showNotReadChat = not_read_chat > 0 ? <Notification>{not_read_chat}</Notification> : null;
    return (
        <li onDoubleClick={onDoubleClick}>
            <img src={roomImg} alt="profile Image" onClick={onImgClick}/>
            <p className="room-block-top">
                <b>{room_name}</b>
                <span>{getUpdatetAt(updatedAt)}</span>
            </p>
            <p className="preview">
                {last_chat}
                {showNotReadChat}
            </p>
        </li>
    )
}



const Content: React.FC<Props> = (props) => {
    const {intoRoom, showProfile, userState} = props;
    const roomList = userState.room_list.sort((a,b) => b.updatedAt.toLocaleString().localeCompare(a.updatedAt.toLocaleString()));
    const friendList = userState.friends_list;
    
    let [rooms, setRooms] = useState([] as Array<RoomListDto>);
    let [notFriends, setNotFriends] = useState([] as Array<UserResponseDto>);
    useEffect(() => {
        const getParticipants = async() => {
            const getRoomList = await Promise.all(roomList.map(async(room) => {
                const participant = await Promise.all(room.participant.map(async(val) => {
                    if(userState.id === val) return userState;
                    const findParticipant = friendList.find(friend => friend.id === val);
                    if(findParticipant){
                        return findParticipant;    
                    }
                    const findNotFriends = notFriends.find(person => person.id === val);
                    if(findNotFriends) {
                        return findNotFriends;
                    }
                    const user = await findUserUsingId(val);
                    await setNotFriends([...notFriends, user]);
                    return user;
                }))
                return {...room, participant}
            }));
            await setRooms([...getRoomList]);
        }
        getParticipants();
    },[userState]);

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
                updatedAt={room.updatedAt}
                last_chat={room.last_chat}
                not_read_chat={room.not_read_chat}
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