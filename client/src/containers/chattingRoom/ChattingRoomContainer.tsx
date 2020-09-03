import React, {Component} from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Content, Footer} from '~/components/chattingRoom';
import { Portal } from '~/pages/Modal';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';
import { ChattingDto, CreateRoomRequest, RoomType } from '~/types/chatting';
import { createRoom } from '~/apis/chat';

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
        const fetchChattingRoomInfo = props.chatActions.fetchChattingRoomInfo;
        const userState = props.rootState.user;
        const chatState = props.rootState.chat;
        const roomList = userState.room_list;
        const findRoom = roomList.find(room => room.identifier === chatState.identifier);
        const participantWithoutMe = chatState.participant.length > 1 ? 
        chatState.participant.filter(person => person.id !== userState.id) : 
        chatState.participant;
        if(findRoom){
            const roomObj: ChattingDto = {
                ...findRoom,
                room_name: participantWithoutMe[0].name,
                participant: participantWithoutMe,
                chatting: []
            }
            fetchChattingRoomInfo(roomObj);
        }
        else{
            const createRoomObj: CreateRoomRequest = {
                type: chatState.type as RoomType,
                identifier: chatState.identifier,
                room_name: "",
                participant: chatState.participant,
            }
            createRoom(createRoomObj).then(val => {
                const roomObj: ChattingDto = {
                    ...val,
                    room_name: participantWithoutMe[0].name,
                    participant: participantWithoutMe,
                    chatting: [],
                }
                fetchChattingRoomInfo(roomObj);
            });
        }

    }

    render() {
        const userState = this.props.rootState.user;
        const chatState = this.props.rootState.chat;
        const authState = this.props.rootState.auth;
        const { hideChattingRoom } = this.props.chatActions;
   
        const onChatSumbmit = (msg: string) => {
            authState.socket?.emit('message', {
                room_id: chatState.room_id,
                type: chatState.type,
                participant: chatState.participant,
                send_user_id: userState.id,
                message: msg,
            });
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


