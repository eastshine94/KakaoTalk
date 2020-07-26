import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.main`
    width: 100%;
    height: 330px;
    padding-top: 30px;
    & input {   
        display: block;
        margin: 0 auto;
        padding: 10px 5px;
        width: 230px;
        border: 1px solid #dcdcdc;
        &:first-child{
            border-bottom: none;
        }
        &::placeholder{
            color: #a2a2a2;
        }
    }
    & button {
        display: block;
        margin: auto;
        margin-top: 5px;
        padding: 10px 5px;
        width: 230px;
        border: 1px solid #dcdcdc;
        color: #a2a2a2;
    }
`;

const Content: React.FC = () => {
    return(
        <Wrapper>
            <form>
                <input type="text" placeholder="계정"/>
                <input type="password" placeholder="비밀번호"/>
                <button>로그인</button>
            </form>
        </Wrapper>
    )
}

export default Content;
