import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Content, Footer } from '~/components/chattingRoom';
import { Portal } from '~/pages/Modal';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';
import { ProfileActions } from '~/store/actions/profile';
import { UserActions } from '~/store/actions/user';
import {
  ChangeChattingRoomDto,
  CreateRoomRequest,
  RoomType,
  ChattingRequestDto,
  FetchChattingRequest,
  ReadChatRequest,
  ReadChatResponse,
  UpdateRoomListDto
} from '~/types/chatting';
import { createRoom } from '~/apis/chat';
import { AddFriendRequestDto } from '~/types/friend';
import { UserResponseDto } from '~/types/user';
import { addFriendRequest } from '~/apis/friend';
import {
  NotFriendWarning,
  DownBtn,
  MessageNotification
} from '~/components/chattingRoom/InfoBlock';

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
  profileActions: typeof ProfileActions;
  userActions: typeof UserActions;
}

let prevScrollHeight = 0;

class ChattingRoomContainer extends Component<Props> {
  messageRef: React.RefObject<HTMLDivElement>;
  state = {
    isShowDownBtn: false,
    sendUserId: undefined,
    msg: ''
  };
  constructor(props: Props) {
    super(props);
    // 채팅방 채팅 영역을 나타냅니다.
    this.messageRef = React.createRef<HTMLDivElement>();
    const userState = props.rootState.user;
    const chatState = props.rootState.chat;
    const roomList = userState.room_list;
    const findRoom = roomList.find(
      room => room.identifier === chatState.identifier
    );
    const participant = chatState.participant;

    const { changeChattingRoomInfo, fetchChatting } = props.chatActions;
    // 채팅방 목록에서 해당 방의 정보를 찾습니다
    if (findRoom) {
      const { updateRoomList } = props.userActions;
      // 해당 채팅방의 모든 채팅을 읽었다고 표시합니다.
      const updateRoomObj: UpdateRoomListDto = {
        room_id: findRoom.room_id,
        not_read_chat: 0
      };
      updateRoomList(updateRoomObj);
      const roomObj: ChangeChattingRoomDto = {
        ...findRoom,
        participant
      };
      changeChattingRoomInfo(roomObj);
      // 서버에서 해당 채팅방의 채팅 목록을 가져옵니다.
      fetchChatting({
        room_id: findRoom.room_id,
        cursor: null
      });
    }
    // 없다면 서버에 채팅방을 만들게 요청하고, 만들어진 채팅방의 정보를 얻습니다.
    else {
      const createRoomObj: CreateRoomRequest = {
        my_id: userState.id,
        type: chatState.type as RoomType,
        identifier: chatState.identifier,
        room_name: '',
        participant
      };
      createRoom(createRoomObj).then(room => {
        const roomObj: ChangeChattingRoomDto = {
          ...room,
          participant
        };
        changeChattingRoomInfo(roomObj);
      });
    }
  }

  componentDidMount() {
    this.messageRef.current!.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    const socket = this.props.rootState.auth.socket;
    this.messageRef.current!.removeEventListener('scroll', this.handleScroll);
    socket!.off('readChat');
    this.updateRoom();
  }
  componentDidUpdate(prevProps: Props) {
    this.changeScroll(prevProps);
    this.updateFriendList(prevProps);
    this.readChat(prevProps);
  }

  // 스크롤 변롸에 따른 action
  handleScroll = () => {
    const messageRef = this.messageRef.current!;
    const scrollTop = messageRef.scrollTop;
    const chatState = this.props.rootState.chat;
    const chatting = chatState.chatting;
    const { fetchChatting } = this.props.chatActions;

    // 스크롤을 맨 위로 올리면, 서버에서 이전 채팅을 불러옵니다.
    if (!chatState.isFetchChattingLoading && scrollTop === 0) {
      const requestObj: FetchChattingRequest = {
        room_id: chatState.room_id,
        cursor: chatting[0].id
      };
      fetchChatting(requestObj);
      prevScrollHeight = messageRef.scrollHeight;
    }

    // 스크롤을 올리면 내림 버튼이 나오게 합니다.
    if (
      prevScrollHeight - messageRef.scrollTop >
      messageRef.clientHeight + 1000
    ) {
      this.setState({
        ...this.state,
        isShowDownBtn: true
      });
    } else {
      this.setState({
        ...this.state,
        isShowDownBtn: false,
        sendUserId: undefined,
        msg: ''
      });
    }
  };

  changeScroll = (prevProps: Props) => {
    const prevChatState = prevProps.rootState.chat;
    const chatState = this.props.rootState.chat;
    const userState = this.props.rootState.user;
    const messageRef = this.messageRef.current!;
    const prevChattingLen = prevChatState.chatting.length;
    const currChattingLen = chatState.chatting.length;
    const currScrollHeight = messageRef.scrollHeight;
    if (prevChattingLen !== currChattingLen) {
      // 처음에 스크롤 가장 아래로
      if (prevChattingLen === 0) {
        this.pageDown();
      } else {
        const prevLastChat = prevChatState.chatting[prevChattingLen - 1];
        const currLastChat = chatState.chatting[currChattingLen - 1];
        // 무한 스크롤에서 스크롤 유지
        if (prevChatState.chatting[0].id !== chatState.chatting[0].id) {
          messageRef.scrollTop = currScrollHeight - prevScrollHeight;
        }
        // 메시지 송수신 시 스크롤 변화
        else if (prevLastChat.id !== currLastChat.id) {
          // 채팅 수신 시, 채팅을 내가 보냈거나 스크롤이 밑에 있다면 스크롤을 가장 아래로 내립니다.
          if (
            currLastChat.send_user_id === userState.id ||
            prevScrollHeight - messageRef.scrollTop <=
              messageRef.clientHeight + 100
          ) {
            this.pageDown();
          }
          // 스크롤이 위에 있다면, 채팅 왔다는 것을 알려주는 컴포넌트를 나타냅니다.
          else if (
            prevScrollHeight - messageRef.scrollTop >
            messageRef.clientHeight + 1000
          ) {
            this.setState({
              ...this.state,
              isShowDownBtn: true,
              sendUserId: currLastChat.send_user_id,
              msg: currLastChat.message
            });
          }
        }
      }
      prevScrollHeight = currScrollHeight;
    }
  };

  // 채팅방에서 친구를 추가하거나 이름을 바꾸는 등의 action을 취하면, 채팅방의 참가자 정보를 바꿉니다.
  updateFriendList = (prevProps: Props) => {
    const prevFriendList = prevProps.rootState.user.friends_list;
    const currentFriendList = this.props.rootState.user.friends_list;
    if (prevFriendList !== currentFriendList) {
      const chatState = this.props.rootState.chat;
      const { changeChattingRoomInfo } = this.props.chatActions;
      const participants = chatState.participant.map(participant => {
        const find = currentFriendList.find(
          friend => friend.id === participant.id
        );
        return find || participant;
      });
      changeChattingRoomInfo({ participant: participants });
    }
  };

  // 채팅을 읽었음을 전달합니다.
  readChat = (prevProps: Props) => {
    const prevChatting = prevProps.rootState.chat.chatting;
    const chatState = this.props.rootState.chat;
    const currChatting = chatState.chatting;
    const prevChattingLen = prevChatting.length;
    const currChattingLen = currChatting.length;

    // 채팅의 변화에 따른
    if (prevChattingLen !== currChattingLen) {
      const lastReadChatId = chatState.last_read_chat_id;
      const lastChat = currChatting[currChattingLen - 1];
      // 마지막으로 읽은 채팅 id와 현재 마지막 채팅 id가 다를 경우
      if (lastChat.id !== lastReadChatId) {
        const socket = this.props.rootState.auth.socket;
        const userState = this.props.rootState.user;
        const { readChatting, changeChattingRoomInfo } = this.props.chatActions;
        const currRange = [lastReadChatId, lastChat.id];

        // 마지막 채팅이 내가 보낸 채팅이 아닐 경우
        if (lastChat.send_user_id !== userState.id) {
          // 마지막으로 읽은 채팅 id 변경
          const roomObj: ChangeChattingRoomDto = {
            last_read_chat_id: lastChat.id
          };
          changeChattingRoomInfo(roomObj);

          // 안 읽은 채팅 수(채팅방 노란색 숫자)를 줄입니다.
          readChatting(currRange);
          const obj: ReadChatRequest = {
            user_id: userState.id,
            room_id: chatState.room_id,
            type: chatState.type as RoomType,
            participant: chatState.participant,
            last_read_chat_id_range: currRange
          };

          // 채팅 참가자들에게 채팅을 읽었다는 신호를 보냅니다.
          socket!.emit('readChat', obj);
        } else {
          // 마지막 채팅이 내가 보낸 거라면, 마지막으로 읽은 채팅 id만 변경
          const roomObj: ChangeChattingRoomDto = {
            last_read_chat_id: lastChat.id
          };
          changeChattingRoomInfo(roomObj);
        }

        // 다른 대화 상대가 메시지를 읽었다는 신호가 오면, 해당 메시지의 안 읽은 채팅 수를 줄입니다.
        socket!.off('readChat');
        socket!.on('readChat', (res: ReadChatResponse) => {
          if (chatState.room_id === res.room_id) {
            const range = res.last_read_chat_id_range;
            readChatting(range);
          }
        });
      }
    }
  };

  // unmount시 해당 방의 마지막으로 읽은 채팅 id를 update합니다.
  updateRoom = () => {
    const { updateRoomList } = this.props.userActions;
    const chatState = this.props.rootState.chat;
    const chatting = chatState.chatting;
    const chattingLen = chatting.length;
    if (chattingLen > 0) {
      updateRoomList({
        room_id: chatState.room_id,
        last_read_chat_id: chatting[chattingLen - 1].id
      });
    }
  };

  // 스크롤을 가장 아래로 내립니다.
  pageDown = () => {
    const messageRef = this.messageRef.current!;
    messageRef.scrollTop = messageRef.scrollHeight;
  };

  render() {
    const userState = this.props.rootState.user;
    const chatState = this.props.rootState.chat;
    const authState = this.props.rootState.auth;
    const roomName = chatState.room_name || chatState.participant[0].name;
    const isMe = chatState.participant[0].id === userState.id;
    const isGroup = chatState.type === 'group';
    const { hideChattingRoom } = this.props.chatActions;
    const { showProfile } = this.props.profileActions;

    const onChatSumbmit = (msg: string) => {
      const chattingRequset: ChattingRequestDto = {
        room_id: chatState.room_id,
        type: chatState.type as RoomType,
        participant: chatState.participant,
        send_user_id: userState.id,
        message: msg,
        not_read: !isGroup && isMe ? 0 : chatState.participant.length
      };
      // 채팅방 참여자들에게 해당 메시지를 보냅니다.
      authState.socket?.emit('message', chattingRequset);
    };

    const isFriend: boolean =
      isGroup ||
      isMe ||
      !!userState.friends_list.find(
        friend => friend.id === chatState.participant[0].id
      );

    const onAddFriendClick = async (friend: UserResponseDto) => {
      const my_id = userState.id;
      const friend_id = friend.id;
      const friend_name = friend.name;
      const { addFriend } = this.props.userActions;
      const request: AddFriendRequestDto = { my_id, friend_id, friend_name };
      try {
        await addFriendRequest(request);
        await addFriend(friend);
      } catch (err) {
        alert('친구 추가 실패');
      }
    };

    const contentProps = {
      myId: userState.id,
      participant: chatState.participant,
      chattingList: chatState.chatting,
      messageRef: this.messageRef,
      showProfile
    };
    const renderNotification = () => {
      if (!!this.state.sendUserId) {
        const findSendUser = chatState.participant.find(
          person => person.id === this.state.sendUserId
        );
        return (
          <MessageNotification
            user={findSendUser}
            msg={this.state.msg}
            onDownClick={this.pageDown}
          />
        );
      }
      return this.state.isShowDownBtn ? (
        <DownBtn onDownClick={this.pageDown} />
      ) : null;
    };
    return (
      <Portal>
        <Wrapper>
          <Header room_name={roomName} hideRoom={hideChattingRoom} />
          <Content {...contentProps}>
            {isFriend ? null : (
              <NotFriendWarning
                onAddFriendClick={() =>
                  onAddFriendClick(chatState.participant[0])
                }
              />
            )}
            {renderNotification()}
          </Content>
          <Footer onChatSumbmit={onChatSumbmit} />
        </Wrapper>
      </Portal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  rootState: state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  chatActions: bindActionCreators(ChatActions, dispatch),
  profileActions: bindActionCreators(ProfileActions, dispatch),
  userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChattingRoomContainer);
