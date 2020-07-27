import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
    width: 100%;
    & label, button {   
        display: block;
        width: 80%;
        margin: 0 auto;
    }
    & label span, button {
        padding: 16px 5px;
        border: 1px solid #dadada;
    }
    & label span {
        display: block;
        margin-bottom: 20px;
        background-color: #fff;
        & input {
            border: none;
            width: 100%;
            outline: 0;
            padding: 0 15px;
        }
    }
    & label h3 {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    & button {
        background-color: #ffeb33;
        font-size: 15px;
        font-weight: bold;
    }
`;

const Content: React.FC = () => {
    const MAX_LEN = 20;
    return(
        <Wrapper>
            <form>
                <label>
                    <h3>아이디</h3>
                    <span><input type="text" maxLength={MAX_LEN}/></span>
                </label>
                <label>
                    <h3>비밀번호</h3>
                    <span><input type="password" maxLength={MAX_LEN}/></span>
                </label>
                <label>
                    <h3>비밀번호 확인</h3>
                    <span><input type="password" maxLength={MAX_LEN}/></span>
                </label>
                <label>
                    <h3>이름</h3>
                    <span><input type="text" maxLength={MAX_LEN}/></span>
                </label>
                
                <button>가입하기</button>
            </form>
        </Wrapper>
    )
}

export default Content;
