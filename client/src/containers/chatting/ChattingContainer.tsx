import React, { Component } from 'react';
import {Main} from '~/styles/BaseStyle';
import { Header, Content } from '~/components/chatting';
class ChattingContainer extends Component {
    render() {
        return(
            <Main>
                <Header/>
                <Content/>
            </Main>
        )
    }
}

export default ChattingContainer;