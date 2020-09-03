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
import { RootState } from '~/store/reducers';
import { PAGE_PATHS } from '~/constants';
import { Auth } from '~/types/auth';
import { ChattingResponseDto } from '~/types/chatting';
import { ProfileContainer, ChattingRoomContainer } from '~/containers';


const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;

interface Props {
    rootState: RootState;
    authActions: typeof AuthActions;
    userActions: typeof UserActions;
}

class MenuContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const auth: Auth|undefined = this.props.rootState.auth.auth;
        const chatState = props.rootState.chat;
        if(auth){
            const socket = props.rootState.auth.socket as typeof Socket;
            props.userActions.fetchUser(auth.user_id);
            props.userActions.fetchFriends(auth.id);
            socket.emit("join",auth.id.toString());
            socket.on("message",(response: ChattingResponseDto) => {
               console.log(response);
               const currentRoomId =  chatState.room_id
               if(response.room_id === currentRoomId){
                   
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuContainer);