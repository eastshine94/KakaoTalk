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
import { UserState } from '../../store/reducers/user';

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
    userData: UserState;
    userActions: typeof UserActions;
}

const FoundFriendProfile: React.FC<Props> = ({findUserId, foundUser, onClose, userData, userActions}) => {
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
            await addFriendRequest(request);
            await addFriend(foundUser);
            await onClose();
        }

        if(existFriend || isMe){
            return(
                <FoundUserProfile>
                    <img src={foundUser.profile_img_url || BASE_IMG_URL} alt="profile_img"/>
                    <p>{existFriend?.name || foundUser.name}</p>
                    <Button>1:1 채팅</Button>
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
    userData: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoundFriendProfile);