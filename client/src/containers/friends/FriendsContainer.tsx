import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/friends';
class FriendsContainer extends Component {
    render() {
        return(
            <Main>
                <Header/>
                <Content/>
            </Main>
        )
    }
}

export default FriendsContainer;