import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
    position: relative;
    width: 360px;
    height: 580px;
    border: 1px solid #646464;
    margin: auto;
    & p {
        min-height: 19px;
        padding: 0px 10px;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & b{
            font-size: 16px;
        }
    }
`;
const CancelIcon = styled.i`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
`
const BackgroundBase = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #848b91;
    z-index: -2;
`;
const BackgroundImage = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    z-index: -1;
`;

const ProfileImage = styled.img`
    display: block;
    margin: auto;
    margin-top: 310px;
    margin-bottom: 10px;
    width: 90px;
    height: 90px;
    border-radius: 35px;
`;


const Footer = styled.div`
    border-top: 1px solid #fff;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    & div{
        text-align: center;
        & i {
            color: #fff;
            font-size: 20px;
            margin-bottom: 5px;
        }
    }
`;
class ProfileContainer extends Component {
    render(){
        return(
            <Wrapper>
                <BackgroundBase/>
                <BackgroundImage src="/asset/bg2.jpg" alt="bg_image"/>
                <CancelIcon className="fas fa-times"/>
                <ProfileImage src="/asset/profile1.jpg" alt="profile_image"/>
                <p><b>홍길동홍길길홍길동홍길길홍길동</b></p>
                <p>상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지</p>
                
                <Footer>
                    <div>
                        <i className="fas fa-comment"/>
                        <p>나와의 채팅</p>
                    </div>
                    <div>
                        <i className="fas fa-pen"/>
                        <p>프로필 관리</p>
                    </div>
                </Footer>
            </Wrapper>
        )
    }
}


export default ProfileContainer;