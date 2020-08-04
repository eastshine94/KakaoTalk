import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
    width: 100%;
    height: 450px;
    padding-top: 300px;
`;

const ProfileImage = styled.img`
    display: block;
    margin: auto;
    margin-bottom: 10px;
    width: 90px;
    height: 90px;
    border-radius: 35px;
`;


const UserProfile: React.FC = () => {
    return(
        <Wrapper>
            <ProfileImage src="/asset/profile1.jpg" alt="profile_image"/>
            <p><b>홍길동홍길길홍길동홍길길홍길동</b></p>
            <p>상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지상태 메시지</p>
        </Wrapper>
    )
}

export default UserProfile;
