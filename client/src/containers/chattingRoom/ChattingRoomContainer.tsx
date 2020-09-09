import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Content, Footer} from '~/components/chattingRoom';
import { Portal } from '~/pages/Modal';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';
import { ProfileActions } from '~/store/actions/profile';
import { ChattingDto, CreateRoomRequest, RoomType, ChattingRequestDto, FetchChattingRequest } from '~/types/chatting';
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
    profileActions : typeof ProfileActions;
}

let offset = 2;
let scrollHeight = 0;
class ChattingRoomContainer extends Component<Props> {
    messageRef: React.RefObject<HTMLDivElement>;
    
    constructor(props: Props) {
        super(props);
        this.messageRef = React.createRef<HTMLDivElement>();
        const userState = props.rootState.user;
        const chatState = props.rootState.chat;
        const roomList = userState.room_list;
        const findRoom = roomList.find(room => room.identifier === chatState.identifier);
        const participantWithoutMe = chatState.participant.length > 1 ? 
        chatState.participant.filter(person => person.id !== userState.id) : 
        chatState.participant;

        const { fetchChattingRoomInfo, fetchChatting } = props.chatActions;
    
        if(findRoom){
            const roomObj: ChattingDto = {
                ...findRoom,
                room_name: participantWithoutMe[0].name,
                participant: participantWithoutMe,
                chatting: []
            }
            fetchChattingRoomInfo(roomObj);
            fetchChatting({
                room_id: findRoom.room_id,
                cursor: null,
                offset: 1,
            });
        }
        else{
            const createRoomObj: CreateRoomRequest = {
                type: chatState.type as RoomType,
                identifier: chatState.identifier,
                room_name: "",
                participant: chatState.participant,
            }
            createRoom(createRoomObj).then(room => {
                const roomObj: ChattingDto = {
                    ...room,
                    room_name: participantWithoutMe[0].name,
                    participant: participantWithoutMe,
                    chatting: [],
                }
                fetchChattingRoomInfo(roomObj);
            });
        }
    }
    
    componentDidMount() {
        this.messageRef.current!.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        this.messageRef.current!.removeEventListener("scroll", this.handleScroll);
        offset = 2;
    }
      
    handleScroll = () => {
        const messageRef = this.messageRef.current!;
        const scrollTop = messageRef.scrollTop;
        const chatState = this.props.rootState.chat
        const chatting = chatState.chatting;
        const {fetchChatting} = this.props.chatActions;
        if(!chatState.isFetchChattingLoading && scrollTop === 0){
            const requestObj: FetchChattingRequest = {
                room_id: chatState.room_id,
                offset,
                cursor: chatting[0].id
            }
            fetchChatting(requestObj);
            offset++;
            scrollHeight = messageRef.scrollHeight;
        }
    }

    componentDidUpdate(prevProps: Props) {
        const prevChatState = prevProps.rootState.chat;
        const chatState = this.props.rootState.chat;
        const userState = this.props.rootState.user;
        const messageRef = this.messageRef.current!;
        const prevChattingLen = prevChatState.chatting.length;
        const currChattingLen = chatState.chatting.length;
        if(prevChattingLen === 0){
            messageRef.scrollTop = messageRef.scrollHeight;
        }
        else if(prevChattingLen !== currChattingLen){
            const prevLastChat = prevChatState.chatting[prevChattingLen - 1];
            const currLastChat = chatState.chatting[currChattingLen-1]
            if(prevChatState.chatting[0].id !== chatState.chatting[0].id){
                messageRef.scrollTop = messageRef.scrollHeight - scrollHeight;
            }
            else if(currLastChat.send_user_id === userState.id  && prevLastChat.id !== currLastChat.id){
                messageRef.scrollTop = messageRef.scrollHeight;
            }
        }
    }

    render() {
        const userState = this.props.rootState.user;
        const chatState = this.props.rootState.chat;
        const authState = this.props.rootState.auth;
        const { hideChattingRoom } = this.props.chatActions;
        const { showProfile } = this.props.profileActions;
        const onChatSumbmit = (msg: string) => {
            const chattingRequset: ChattingRequestDto = {
                room_id: chatState.room_id,
                type: chatState.type as RoomType,
                participant: chatState.participant,
                send_user_id: userState.id,
                message: msg,
            }
            authState.socket?.emit('message', chattingRequset);
        }
        return(
            <Portal>
                <Wrapper>
                    <Header room_name={chatState.room_name} hideRoom={ hideChattingRoom }/>
                    <Content myId= {userState.id} participant= {chatState.participant} chattingList={chatState.chatting} messageRef={this.messageRef} showProfile={showProfile}/>
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
    profileActions: bindActionCreators(ProfileActions, dispatch),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChattingRoomContainer);


