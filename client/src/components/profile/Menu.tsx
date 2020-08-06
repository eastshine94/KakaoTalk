import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    border-top: 1px solid #fff;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    & div{
        text-align: center;
        cursor: pointer;
        & i {
            color: #fff;
            font-size: 20px;
            margin-bottom: 5px;
        }
        
    }
`;

const Menu: React.FC = () => {

    return(
        <Wrapper>
            <div>
                <i className="fas fa-comment"/>
                <p>1:1 채팅</p>
            </div>
        </Wrapper>
    )
}

export default Menu;
