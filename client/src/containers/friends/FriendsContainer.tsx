import React, { Component } from 'react';
import { Main } from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserActions } from '~/store/actions/user';
import { ProfileActions } from '~/store/actions/profile';
import { ChatActions } from '~/store/actions/chat';

interface Props {
  rootState: RootState;
  userActions: typeof UserActions;
  profileActions: typeof ProfileActions;
  chatActions: typeof ChatActions;
}

class FriendsContainer extends Component<Props> {
  state = {
    search: ''
  };
  constructor(props: Props) {
    super(props);
    const { hideChattingRoom } = props.chatActions;
    hideChattingRoom();
    window.scrollTo(0, 0);
  }
  render() {
    const userState = this.props.rootState.user;
    const { showProfile } = this.props.profileActions;
    const { showChattingRoom } = this.props.chatActions;
    const changeSearch = (param: string) => {
      this.setState({
        ...this.state,
        search: param
      });
    };
    return (
      <Main>
        <Header changeSearch={changeSearch} />
        <Content
          search={this.state.search}
          userData={userState}
          showProfile={showProfile}
          showChattingRoom={showChattingRoom}
        />
      </Main>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  rootState: state
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  profileActions: bindActionCreators(ProfileActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
