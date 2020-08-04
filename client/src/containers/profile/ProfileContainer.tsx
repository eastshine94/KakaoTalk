import React, {Component} from 'react';
import styled from 'styled-components';
import { UserProfile, Menu } from '~/components/profile';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    min-height: 100vh;
    padding: 40px 0;
`;
const Content = styled.main`
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
class ProfileContainer extends Component {
    render(){
        return(
            <Wrapper>
                <Content>
                    <BackgroundBase/>
                    <BackgroundImage src="/asset/bg2.jpg" alt="bg_image"/>
                    <CancelIcon className="fas fa-times"/>
                    <UserProfile/>
                    <Menu/>
                </Content>
            </Wrapper>
        )
    }
}


export default ProfileContainer;