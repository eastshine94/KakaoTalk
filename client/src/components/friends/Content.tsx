import React from 'react';
import styled from 'styled-components';
import {  MainContent } from '~/styles/BaseStyle';

const MyProfileBlock = styled.div`
    position: relative;
    padding: 25px 10px 25px 85px;
    & img {
        position: absolute;
        top: 18px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 15px;
    }
    & p {
        color: #707070;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & b{
            color: #000;
            font-weight: bold;
        }
    }
    &:hover {
        background-color: #eaeaeb;
    }
`;

const FriendsBorder = styled.div`
    border-top: 0.5px solid #dcdcdc;
    margin: 0 20px;
    padding-top: 10px;
    & p {
        font-size: 12px;
        color: #b4b4b4;
    }
`;

const Content: React.FC = () => {
    return(
        <MainContent>
            <MyProfileBlock>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoy3heSU-2SeFekCWTQ2mgw-WfCzV8DJYdtg&usqp=CAU" alt="profile Image"/>
                <p><b>내 이름</b></p>
                <p>60606060606060606060606060606060606060606060606060606060606060606060606060606060606060606060606060606060</p>
            </MyProfileBlock>
            <FriendsBorder>
                <p>친구 100</p>
            </FriendsBorder>
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
    )
}

export default Content;