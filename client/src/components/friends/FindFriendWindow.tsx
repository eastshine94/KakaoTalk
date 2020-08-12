import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #c8c8c8;
    opacity: 0.5;
    z-index: 99;
`;
const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 360px;
    height: 450px;
    border: 1px solid #646464;
    margin: auto;
    color: #000;
    background: #fff;
    & h4 {
        padding: 25px 20px;
        font-size: 18px;
        font-weight: 600;
    }
    
    & form{
        width: 90%;
        border-bottom: 2px solid #000;
        margin: 30px auto;
        & input, span{
            padding: 5px;
        }
        & input{
            width: 85%;
            outline: none;
            border: none;
        }
        & span {
            display: inline-block;
            width: 15%;
            text-align: center;
        }
    }

    & img{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 35px;
        margin: auto;
        margin-top: 50px;
    }

    & p {
        text-align: center;
        padding-top: 10px;
    }
`;
const Menu = styled.div`
    padding: 0 20px;
    border-bottom: 1px solid #dcdcdc;
    & span{
        display: inline-block;
        font-size: 13px;
        font-weight: bold;
        border-bottom: 1px solid #000;
        padding: 10px 0;
    }  
`
const Button = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: inline-block;
    padding: 10px;
    background: #fee500;
    &:hover{
        background: #fada0a;
        cursor: pointer;
    }
`;
const CancelIcon = styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
`
const FindFriendWindow: React.FC = () => {
    return(
        <React.Fragment>
            <Overlay/>
            <Wrapper>
                <CancelIcon className="fas fa-times" />
                <h4>친구 추가</h4>
                <Menu><span>ID로 추가</span></Menu>
                <form>
                    <input  maxLength={20} autoFocus={true}/>
                    <span>{`0/20`}</span>
                </form>
                <img src="/asset/base_profile.jpg" alt="profile_img"/>
                <p>이름</p>
                <Button>친구 추가</Button>
            </Wrapper>
        </React.Fragment>
    )
}


export default FindFriendWindow;