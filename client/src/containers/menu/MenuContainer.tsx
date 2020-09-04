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
import { ChattingResponseDto } from '~/types/chatting';

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
            socket.emit("join",auth.id.toString());
            
        }
    }

    async componentDidUpdate(prevProps: Props){
        const chatState = this.props.rootState.chat;
        const socket = this.props.rootState.auth.socket as typeof Socket;
        const { addChatting } = this.props.chatActions;
        if(prevProps.rootState.chat.room_id !== chatState.room_id){
            await socket.off("message");
            await socket.on("message",(response: ChattingResponseDto) => {
                if(response.room_id === chatState.room_id){
                    addChatting(response);
                }  
            });
        }
    }

    render() {
        const { logout } = this.props.authActions;
        const { token } = this.props.rootState.auth;
        const chatState = this.props.rootState.chat;
        if(!token) {
            return <Redirect to={PAGE_PATHS.LOGIN}/>
        }

        return (
            <React.Fragment>
                <ProfileContainer/>
                {chatState.isChattingRoomShown ? <ChattingRoomContainer/> : null}
                <Wrapper>
                    <MenuSideBar logout={logout}/>
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