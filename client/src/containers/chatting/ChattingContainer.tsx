import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/chatting';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';

interface Props {
    rootState: RootState;
    chatActions: typeof ChatActions;
}

class ChattingContainer extends Component<Props> {
    render() {
        const { showChattingRoom } = this.props.chatActions;
        const roomList = this.props.rootState.user.room_list;
        return(
            <Main>
                <Header/>
                <Content roomList={roomList} intoRoom={showChattingRoom}/>
            </Main>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    chatActions: bindActionCreators(ChatActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChattingContainer);