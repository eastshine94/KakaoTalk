import React, {Component} from 'react';
import styled from 'styled-components';
import { Header, Content, Footer} from '~/components/chattingRoom';
import { ChattingResponseDto } from '~/types/chatting';
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: #b2c7d9;
`;

class ChattingRoomContainer extends Component {
    state = {
        chattingList: [
            {
                id: 1,
                send_user_id: 1, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 2,
                send_user_id: 1, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 3,
                send_user_id: 1, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 4,
                send_user_id: 2, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 5,
                send_user_id: 2, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 6,
                send_user_id: 2, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 7,
                send_user_id: 1, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 8,
                send_user_id: 2, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
            {
                id: 9,
                send_user_id: 2, message:"채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
            },
        ]
    }

    render() {
        const setChatting = (param: Array<ChattingResponseDto>) => {
            this.setState({
                ...this.state,
                chattingList: param
            })
        }
        return(
            <Wrapper>
                <Header/>
                <Content chattingList={this.state.chattingList}/>
                <Footer chattingList={this.state.chattingList} setChatting={setChatting}/>
            </Wrapper>
        )
    }
}

export default ChattingRoomContainer;


