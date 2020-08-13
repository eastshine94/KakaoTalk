import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserActions } from '~/store/actions/user';
import { ProfileActions } from '~/store/actions/profile';
import { ProfileContainer } from '~/containers';

interface Props{
    rootState: RootState;
    userActions: typeof UserActions;
    profileActions: typeof ProfileActions;
}


class FriendsContainer extends Component<Props> {
    render() {
        const userState = this.props.rootState.user;
        const { showProfile } = this.props.profileActions;
        return(
            <React.Fragment>
                <ProfileContainer/>
                <Main>
                    <Header userData={userState}/>
                    <Content userData={userState} showProfile={showProfile}/>
                </Main>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
    profileActions: bindActionCreators(ProfileActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsContainer);