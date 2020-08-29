import React, { Component } from 'react';
import styled from 'styled-components';
import { UserProfile, Menu } from '~/components/profile';
import {connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '~/store/reducers';
import { ProfileActions } from '~/store/actions/profile';
import { ChatActions } from '~/store/actions/chat';
import { Modal } from '~/pages';
import { ChattingDto } from '~/types/chatting';


const Wrapper = styled.main`
    width: 360px;
    height: 580px;
    margin: auto;
    color: #fff; 
    text-align: center;
`;
const BackgroundBase = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #848b91;
    z-index: -1;
    & img {
        width: 100%;
        height: 100%;
        opacity: 0.6;
    }
`;
const CancelIcon = styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #fff;
    z-index: 100;
    cursor: pointer;
`

interface Props {
    rootState: RootState;
    profileActions: typeof ProfileActions;
    chatActions: typeof ChatActions;
}

class ProfileContainer extends Component<Props> {
    render(){
        const profileState = this.props.rootState.profile;
        const userState = this.props.rootState.user;
        const isMe = profileState.id === userState.id;

        const { hideProfile } = this.props.profileActions;
        const { showChattingRoom } = this.props.chatActions;
        const setBackground = profileState.background_img_url ? <img src={profileState.background_img_url} alt="bg_image"/> : "";
        if(!profileState.isProfileShown) return null;

        const onChatClick = () => {
            const myId = userState.id;
            const friendId = profileState.id;
            const identifier = myId < friendId ? `${myId}-${friendId}`:`${friendId}-${myId}`
            const roomObj: ChattingDto = {
                type: "individual",
                room_name: profileState.name,
                identifier,
                participant: [profileState],
                chatting: [],
            }            
            showChattingRoom(roomObj);
            hideProfile();
        }
        return(
            <Modal onClose={hideProfile}>
                <Wrapper>
                    <BackgroundBase>
                        {setBackground}
                    </BackgroundBase>
                    <CancelIcon className="fas fa-times" onClick={hideProfile}/>
                    <UserProfile/>
                    <Menu isMe={isMe} onChatClick={onChatClick}/>
                </Wrapper>
            </Modal>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
    chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);