import React,{ useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

const SettingBg = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #000;
    opacity: 0.5;
`;
const InputBlock = styled.div`
    position: absolute;
    bottom: 0;
    background: #fff;
    color: #000;
    width : 100%;
    height: 150px;
    z-index: 100;
    & div{
        width: 90%;
        border: 1px solid #3498db;
        margin: 50px auto;
        & input, span, button{
            padding: 5px;
        }
        & input{
            width: 75%;
            outline: none;
            border: none;
        }
        & span {
            display: inline-block;
            width: 15%;
            text-align: center;
        }
        & button {
            width: 10%;
            cursor: pointer;
            &:hover {
                background: #dcdcdc;
            }
        }
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


interface Props{
    currentValue: string;
    maxLength : number;
    showWindow(isShow:boolean): void;
}

const ProfileInputWindow: React.FC<Props> = ({currentValue, maxLength, showWindow}) => {
    const [value, setValue] = useState(currentValue);
    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setValue(value.substr(0,maxLength));
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        showWindow(false);
    }
    return(
        <React.Fragment>
            <SettingBg/>
            <InputBlock>
                <CancelIcon className="fas fa-times" onClick={() => showWindow(false)}/>
                <div>
                    <form onSubmit={onSubmit}>
                        <input value={value} maxLength={maxLength} onChange={onValueChange}/>
                        <span>{`${value.length}/${maxLength}`}</span>
                        <button type="submit"><i className="fas fa-check"/></button>
                    </form>
                </div>
            </InputBlock>
        </React.Fragment>
    )
}

export default ProfileInputWindow;