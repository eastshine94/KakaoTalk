import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/chatting';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';
import { ProfileActions } from '~/store/actions/profile';

interface Props {
    rootState: RootState;
    profileActions : typeof ProfileActions;
    chatActions: typeof ChatActions;
}

class ChattingContainer extends Component<Props> {
    render() {
        const userState = this.props.rootState.user;
        const { showProfile } = this.props.profileActions;
        const { showChattingRoom } = this.props.chatActions;

        return(
            <Main>
                <Header/>
                <Content userState={userState} showProfile={showProfile} intoRoom={showChattingRoom}/>
            </Main>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
    chatActions: bindActionCreators(ChatActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChattingContainer);