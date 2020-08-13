import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { findUser } from '~/apis/user';
import { UserData, UserResponseDto } from '~/types/user';
import Modal, {ModalProps} from '~/pages/Modal';
import FoundFriendProfile from './FoundFriendProfile';


const Wrapper = styled.div`
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
const CancelIcon = styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
`


interface Props extends ModalProps{
    userData: UserData;
}


const FindFriendWindow: React.FC<Props> = (props) => {
    const { userData, overlayClose ,onClose } = props;
    const MAX_LEN = 20;
    const [userId, setUserId] = useState("");
    const [foundUser, setFoundUser] = useState<UserResponseDto|undefined|null>();
    const [findUserId, setFindUserId] = useState("");

    const onIdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        if(value.length <=20){
            setUserId(event.target.value);
        }
        if(value.length === 0){
            setFoundUser(undefined);
        }
    }
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await findUser(userId);
        await setFoundUser(user);
        await setFindUserId (userId);
    }
    return(
        <Modal overlayClose={overlayClose} onClose={onClose}>
            <Wrapper>
                <CancelIcon className="fas fa-times" onClick={onClose}/>
                <h4>친구 추가</h4>
                <Menu><span>ID로 추가</span></Menu>
                <form onSubmit={onSubmit}>
                    <input 
                        value= {userId} 
                        maxLength={MAX_LEN} 
                        autoFocus={true} 
                        onChange={onIdInputChange}
                    />
                    <span>{`${userId.length}/${MAX_LEN}`}</span>
                </form>
                <FoundFriendProfile userData={userData} findUserId={findUserId} foundUser= {foundUser}/>
            </Wrapper>
        </Modal>
    )
}

export default FindFriendWindow;