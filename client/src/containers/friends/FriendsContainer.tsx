import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
import {connect} from 'react-redux';
import { RootState } from '~/store/reducers';
import { UserState } from '~/store/reducers/user';

interface Props{
    userState: UserState,
}


class FriendsContainer extends Component<Props> {
    render() {
        const { userState } = this.props
        return(
            <Main>
                <Header/>
                <Content userData={userState}/>
            </Main>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
})
const mapDispatchToProps = () => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsContainer);