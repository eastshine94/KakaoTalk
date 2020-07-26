import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    & ul{
        display: flex;
        justify-content: center;
        & li {
            color: #5a5a5a;
        }
    }
`;

const Footer: React.FC = () => {
    return(
        <Wrapper>
            <ul>
                <li>회원 가입</li>
            </ul>
        </Wrapper>
    )
}

export default Footer;
