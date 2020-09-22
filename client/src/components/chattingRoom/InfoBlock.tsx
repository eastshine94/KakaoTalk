import React from 'react';
import styled from 'styled-components';

const BorderBlock = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    padding: 13px 0;
    & span {
        position: relative;
        display: inline-block;
        background-color: #b2c7d9;
        padding: 0 10px;
    }
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 2%;
        top: 50%;
        width : 96%;
        height: 1px;
        background-color: #727b83;
    }
`;
const WarningAreaBlock = styled.div`
    width: 100%;
    height: 100px;
`
const NotFriendBlock = styled.div`
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    z-index: 200;
    & div {
        width: 96%;
        opacity: 0.9;
        background: #fff;
        color: #000;
        margin: 0 auto;
        margin-bottom: 10px;
        @media only screen and (max-width: 960px){
            width: 90%;
        }
    }
    
`
const ActionBlock = styled.div`
    display: flex;
    justify-content: center;
    & span {
        display: block;
        width: 33%;
        padding: 7px;
        text-align: center;
        font-size: 13px;
        cursor: pointer;
        &:hover{
            background: #eeeeee;
        }
    }
`
const WarningBlock = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    height: 50px;

    & p {
        display: block;
    }
    
    & i {
        display: block;
        font-size: 26px;
        color: red;
        margin-right: 10px;
    }
`

interface SeparationBlockProps {
    content: string;
}

interface NotFriendWariningProps {
    onAddFriendClick(): void;
}

export const SeparationBlock: React.FC<SeparationBlockProps> = ({content}) => {
    return(
        <BorderBlock><span>{content}</span></BorderBlock>
    )
}

export const NotFriendWarning: React.FC<NotFriendWariningProps> = (props) => {
    const { onAddFriendClick } = props;
    return(
        <WarningAreaBlock>
            <NotFriendBlock>
                <ActionBlock>
                    <span onClick={onAddFriendClick}><i className="fas fa-user-plus"/> 추가</span>
                </ActionBlock>
                <WarningBlock>
                    <i className="fas fa-exclamation-triangle"/>
                    <p> 친구로 등록되지 않은 사용자입니다. 금전 요구 등으로 인한 피해를 입지 않도록 주의해주세요.</p>
                </WarningBlock>
            </NotFriendBlock>  
            
        </WarningAreaBlock>       
    )
}