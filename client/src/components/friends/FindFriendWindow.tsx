import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { findUser } from '~/apis/user';
import { UserResponseDto } from '~/types/user';
import Modal, {ModalProps} from '~/pages/Modal';


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
const FoundUserProfile = styled.div`
    margin-top: 50px;
    & img{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 35px;
        margin: auto;
    }

    & p {
        text-align: center;
        padding-top: 10px;
    }
`
const FindNull = styled.div`
    text-align: center;
    & p {
        padding-top: 50px;
        font-size: 15px;
        font-weight: bold;
    }
`;

interface FindUserProfileProps {
    findUserId: string;
    user: UserResponseDto|undefined|null;
}

const FindUserProfile: React.FC<FindUserProfileProps> = ({findUserId, user}) => {
    if(user){
        return(
            <FoundUserProfile>
                <img src={user.profile_img_url || "/asset/base_profile.jpg"} alt="profile_img"/>
                <p>{user.name}</p>
                <Button>친구 추가</Button>
            </FoundUserProfile>
        )
    }
    if(user===null){
        return(
            <FindNull>
                <p>{`'${findUserId}'를 찾을 수 없습니다.`}</p>
            </FindNull>
        )
    }
    return null;
}

const FindFriendWindow: React.FC<ModalProps> = (props) => {
    const {visible, overlayClose ,onClose } = props;
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
        <Modal visible={visible} overlayClose={overlayClose} onClose={onClose}>
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
                <FindUserProfile findUserId={findUserId} user= {foundUser}/>
            </Wrapper>
        </Modal>
    )
}


export default FindFriendWindow;