import React,{ useState, ChangeEvent, FormEvent} from 'react';
import styled from 'styled-components';
import { LoginData } from '~/types/auth';

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
        border: 1px solid #000;
        color: #fff;
        background-color: #423630;
        outline: none;
        &:hover {
            background-color:#594941;
            cursor: pointer;
        }
        &:active{
            background-color: #423630; 
        }
    }
`;

interface Props {
    login(loginData: LoginData): void;
}
const Content: React.FC<Props> = (props) => {
    const { login } = props;
    const MAX_LEN = 20;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const onUserIdChange = (event: ChangeEvent<HTMLInputElement>):void => {
        event.preventDefault();
        const value = event.target.value;
        setUserId(value);
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>):void => {
        event.preventDefault();
        const value = event.target.value;
        setPassword(value);
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({userId, password});
    }

    return(
        <Wrapper>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="계정" maxLength={MAX_LEN} onChange={onUserIdChange}/>
                <input type="password" placeholder="비밀번호" maxLength={MAX_LEN} onChange={onPasswordChange}/>
                <button>로그인</button>
            </form>
        </Wrapper>
    )
}

export default Content;
