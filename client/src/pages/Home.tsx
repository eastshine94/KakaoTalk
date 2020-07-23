import React, { Component } from 'react';
import styled from 'styled-components';
import { SideBar, Main, MainHeader,TitleBlock, MainContent } from '~/styles/BaseStyle';
const Wrapper = styled.main`
    width: 100%;
    display: flex;
`;
class Home extends Component {
    render() {
        return (
            <Wrapper>
                <SideBar>
                    <ul>
                        <li title="친구"><i className="fas fa-user"/></li>
                        <li title="채팅"><i className="fas fa-comment"/></li>
                    </ul>
                </SideBar>
                <Main>
                    <MainHeader>
                        <TitleBlock>
                            <h2>친구</h2>
                            <i className="fas fa-user-plus"/>
                        </TitleBlock>
                        <input placeholder="이름 검색"/>                        
                    </MainHeader>
                    <MainContent>
                        <ul>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                            <li>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                                <p><b>홍길동</b></p>
                                <p>상태</p>
                            </li>
                        </ul>
                    </MainContent>
                </Main>
            </Wrapper>
        );
    }
}

export default Home;