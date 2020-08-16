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
    state = {
        search: "", 
    }
    render() {
        const userState = this.props.rootState.user;
        const { showProfile } = this.props.profileActions;
        const changeSearch = (param: string) => {
            this.setState({
                ...this.state,
                search: param
            })
        }
        return(
            <React.Fragment>
                <ProfileContainer/>
                <Main>
                    <Header changeSearch={changeSearch}/>
                    <Content search={this.state.search}userData={userState} showProfile={showProfile}/>
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