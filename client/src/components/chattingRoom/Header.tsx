import React, {MouseEvent} from 'react';
import styled from 'styled-components';
const Wrapper = styled.header`
    width: 100%;
	background-color: #a9bdce;
	height: 50px;
    & span{
        display: inline-block;
        font-weight: bold;
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

interface Props {
    room_name: string
    hideRoom(): void;
}

const Header: React.FC<Props> = (props) => {
    const { room_name, hideRoom } = props;
    const onBackBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        hideRoom();
    }
    return(
        <Wrapper>
            <button type="button" onClick={onBackBtnClick}><i className="fas fa-arrow-left"/></button>
            <span>{ room_name }</span>
        </Wrapper>
    )
}

export default Header;