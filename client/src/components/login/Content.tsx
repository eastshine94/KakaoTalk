import React, { useState, ChangeEvent, FormEvent } from 'react';
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
    &:first-child {
      border-bottom: none;
    }
    &::placeholder {
      color: #a2a2a2;
    }
  }
  & button {
    position: relative;
    display: block;
    margin: auto;
    margin-top: 5px;
    padding: 10px 5px;
    width: 230px;
    border: 1px solid #000;
    color: #fff;
    background-color: #423630;
    outline: none;
    @keyframes iconLotate {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    & i {
      position: absolute;
      top: 15px;
      right: 10px;
      color: #5c5c5c;
      animation: iconLotate 1.5s linear infinite;
    }
    &:hover {
      background-color: #594941;
      cursor: pointer;
    }
    &:active {
      background-color: #423630;
    }
    &.disabled {
      color: #969696;
      background: #e2e2e2;
      pointer-events: none;
      border: 1px solid #dcdcdc;
    }
  }
  & p {
    padding-top: 20px;
    text-align: center;
    color: red;
  }
`;

interface Props {
  login(loginData: LoginData): void;
  changeMessage(message: string): void;
  loginFailuerMsg: string;
  loggingIn: boolean;
}
const Content: React.FC<Props> = props => {
  const { login, changeMessage, loginFailuerMsg, loggingIn } = props;
  const MAX_LEN = 20;
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const onUserIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (!loggingIn) {
      const value = event.target.value;
      setUserId(value);
    }
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (!loggingIn) {
      const value = event.target.value;
      setPassword(value);
      if (value.length >= 5) {
        changeMessage('');
      }
    }
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loggingIn && password.length >= 5) {
      login({ userId, password });
      setPassword('');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={userId}
          placeholder="계정"
          maxLength={MAX_LEN}
          onChange={onUserIdChange}
        />
        <input
          type="password"
          value={password}
          autoComplete="new-password"
          placeholder="비밀번호"
          maxLength={MAX_LEN}
          onChange={onPasswordChange}
        />
        <button className={loggingIn || password.length < 5 ? 'disabled' : ''}>
          {loggingIn ? <i className="fas fa-circle-notch" /> : ''}
          <span>로그인</span>
        </button>
        <p>{loginFailuerMsg}</p>
      </form>
    </Wrapper>
  );
};

export default Content;
