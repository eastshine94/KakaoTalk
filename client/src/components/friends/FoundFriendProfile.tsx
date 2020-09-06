import React, {MouseEvent} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { UserResponseDto } from '~/types/user';
import {BASE_IMG_URL} from '~/constants';
import { addFriendRequest } from '~/apis/friend';
import { AddFriendRequest } from '~/types/friend';
import { UserActions } from '~/store/actions/user';
import { RootState } from '../../store/reducers';
import { CreateRoomRequest } from '~/types/chatting';
import { ChatActions } from '~/store/actions/chat';


const FoundUserProfile = styled.div`
    margin-top: 50px;
    & img{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 35px;
        margin: auto;
    }

    & p {
        text-align: center;
        padding-top: 10px;
    }
`
const FindNull = styled.div`
    text-align: center;
    & p {
        padding-top: 50px;
        font-size: 15px;
        font-weight: bold;
    }
`;
const Button = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: inline-block;
    padding: 10px;
    background: #fee500;
    &:hover{
        background: #fada0a;
        cursor: pointer;
    }
`;

interface Props {
    findUserId: string;
    foundUser: UserResponseDto|undefined|null;
    onClose(): void
    rootState: RootState;
    userActions: typeof UserActions;
    chatActions: typeof ChatActions;
}

const FoundFriendProfile: React.FC<Props> = (props) => {
    const {findUserId, foundUser, onClose, rootState, userActions} = props;
    const userData = rootState.user;
    if(foundUser){
        const my_id = userData.id;
        const friend_id = foundUser.id;
        const friend_name = foundUser.name;
        const friendsList = userData.friends_list;
        const existFriend = friendsList.find(friend => friend.id === friend_id);
        const isMe = my_id === friend_id;
        const { addFriend } = userActions;
        const onAddFriendClick = async(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            const request: AddFriendRequest = { my_id, friend_id, friend_name };
            try {
                await addFriendRequest(request);
                await addFriend(foundUser);
                await onClose();
            }catch(err) {
                alert("친구 추가 실패");
            }
        }

        if(existFriend || isMe){
            const {showChattingRoom} = props.chatActions;
            const onChatClick = () => {
                const myId = userData.id;
                const friendId = foundUser.id;
                const identifier = myId < friendId ? `${myId}-${friendId}`:`${friendId}-${myId}`
    
                const roomObj: CreateRoomRequest = {
                    type: "individual",
                    identifier,
                    room_name: "",
                    participant: isMe ?  [{...userData}] : [{...foundUser}, {...userData}],
                }
                showChattingRoom(roomObj);
                onClose();
            }
            return(
                <FoundUserProfile>
                    <img src={foundUser.profile_img_url || BASE_IMG_URL} alt="profile_img"/>
                    <p>{existFriend?.name || foundUser.name}</p>
                    <Button onClick={onChatClick}>1:1 채팅</Button>
                </FoundUserProfile>
            )
        } 
        return(
            <FoundUserProfile>
                <img src={foundUser.profile_img_url || BASE_IMG_URL} alt="profile_img"/>
                <p>{foundUser.name}</p>
                <Button onClick={onAddFriendClick}>친구 추가</Button>
            </FoundUserProfile>
        )
    }
    if(foundUser===null){
        return(
            <FindNull>
                <p>{`'${findUserId}'를 찾을 수 없습니다.`}</p>
            </FindNull>
        )
    }
    return null;
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
    chatActions: bindActionCreators(ChatActions, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoundFriendProfile);