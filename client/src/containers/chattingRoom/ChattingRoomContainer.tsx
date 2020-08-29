import React, {Component} from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Content, Footer} from '~/components/chattingRoom';
import { Portal } from '~/pages/Modal';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';


const Wrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100vh;
    background: #b2c7d9;
`;

interface Props {
    rootState: RootState;
    chatActions: typeof ChatActions;
}


class ChattingRoomContainer extends Component<Props> {
   
    render() {
        const userState = this.props.rootState.user;
        const chatState = this.props.rootState.chat;
        const { hideChattingRoom, addChatting } = this.props.chatActions;
        if(!chatState.isChattingRoomShown) return null;
        const onChatSumbmit = (msg: string) => {
            addChatting({
                send_user_id: userState.id,
                message: msg,
            })
        }
        return(
            <Portal>
                <Wrapper>
                    <Header room_name={chatState.room_name} hideRoom={ hideChattingRoom }/>
                    <Content chattingList={chatState.chatting}/>
                    <Footer onChatSumbmit={ onChatSumbmit }/>
                </Wrapper>
            </Portal>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    chatActions: bindActionCreators(ChatActions, dispatch),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChattingRoomContainer);


