import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserActions } from '~/store/actions/user';
import { ProfileActions } from '~/store/actions/profile';


interface Props{
    rootState: RootState;
    userActions: typeof UserActions;
    profileActions: typeof ProfileActions;
}


class FriendsContainer extends Component<Props> {
    state = {
        search: "", 
    }
    constructor(props: Props) {
        super(props);
        props.rootState.auth.socket?.emit("message",2,"안녕안녕안녕");
      
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
            <Main>
                <Header changeSearch={changeSearch}/>
                <Content search={this.state.search}userData={userState} showProfile={showProfile}/>
            </Main>
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