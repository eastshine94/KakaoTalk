import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    width: 100%;
	background-color: #a9bdce;
	height: 50px;
    & span{
        display: inline-block;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        margin-left: 10px;
        margin-top: 10px;
    }
    & button{
        font-size: 20px;
        padding: 10px 10px 10px 30px;
        background-color: #a9bdce;
        outline: none;
        cursor: pointer;
        &:hover {
            color: #dcdcdc;
        }
    }
`

const Header: React.FC = () => {
    return(
        <Wrapper>
            <button type="button"><i className="fas fa-arrow-left"/></button>
            <span>Web Kakao Interface</span>
        </Wrapper>
    )
}

export default Header;