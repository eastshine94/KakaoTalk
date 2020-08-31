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
    
    constructor(props: Props) {
        super(props);
        const roomList = props.rootState.user.room_list;
        const identifier = props.rootState.chat.identifier;
        const findRoom = roomList.find(room => room.identifier === identifier);
        if(findRoom){
            
        }
    }
    
    render() {
        const userState = this.props.rootState.user;
        const chatState = this.props.rootState.chat;
        const { hideChattingRoom, addChatting } = this.props.chatActions;
        if(!chatState.isChattingRoomShown) return null;
        const onChatSumbmit = (msg: string) => {
            addChatting({
                room_id: chatState.room_id,
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


