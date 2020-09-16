import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators} from 'redux';
import { Socket } from 'socket.io-client';
import { MenuRoute } from '~/routes';
import { MenuSideBar } from '~/components/menu';
import { AuthActions } from '~/store/actions/auth';
import { UserActions } from '~/store/actions/user';
import { ChatActions } from '~/store/actions/chat';
import { RootState } from '~/store/reducers';
import { PAGE_PATHS } from '~/constants';
import { Auth } from '~/types/auth';
import { ProfileContainer, ChattingRoomContainer } from '~/containers';
import { ChattingResponseDto, UpdateRoomListDto } from '~/types/chatting';

const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;

interface Props {
    rootState: RootState;
    authActions: typeof AuthActions;
    userActions: typeof UserActions;
    chatActions: typeof ChatActions;
}

class MenuContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const auth: Auth|undefined = props.rootState.auth.auth;
        if(auth){
            const socket = props.rootState.auth.socket as typeof Socket;
            props.userActions.fetchUser(auth.user_id);
            props.userActions.fetchFriends(auth.id);
            props.userActions.fetchRoomList(auth.id);
            socket.emit("join",auth.id.toString());
            socket.on("message", (response: ChattingResponseDto) => {
                this.updateRooms(response);
            });
        }
    }

    updateRooms = async(response: ChattingResponseDto) => {
        const userState = this.props.rootState.user;
        const roomList = userState.room_list;
        const { fetchRoomList, updateRoomList } = this.props.userActions;
        
        const findRoom = roomList.find(room => room.room_id === response.room_id);
        if(findRoom){
            const updateRoomObj: UpdateRoomListDto = {
                room_id: response.room_id,
                last_chat: response.message,
                updatedAt: response.createdAt,
                not_read_chat: findRoom.not_read_chat + 1
            }
            updateRoomList(updateRoomObj)
        }else{
            await fetchRoomList(userState.id);
        }
    }

    async componentDidUpdate(prevProps: Props){
        const chatState = this.props.rootState.chat;
        if(prevProps.rootState.chat.room_id !== chatState.room_id){
            const socket = this.props.rootState.auth.socket as typeof Socket;
            const { addChatting } = this.props.chatActions;
            await socket.off("message");
            await socket.on("message", async(response: ChattingResponseDto) => {
                if(response.room_id === chatState.room_id){
                    await addChatting(response);
                }
                await this.updateRooms(response);
            });
        }
    }

    render() {
        const { logout } = this.props.authActions;
        const { token } = this.props.rootState.auth;
        const chatState = this.props.rootState.chat;
        const userState = this.props.rootState.user;
        const roomList = userState.room_list;
        if(!token) {
            return <Redirect to={PAGE_PATHS.LOGIN}/>
        }

        return (
            <React.Fragment>
                <ProfileContainer/>
                {chatState.isChattingRoomShown ? <ChattingRoomContainer/> : null}
                <Wrapper>
                    <MenuSideBar roomList={roomList} logout={logout}/>
                    <MenuRoute/>
                </Wrapper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
    chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuContainer);