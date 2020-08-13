import React from 'react';
import {createPortal } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #c8c8c8;
    opacity: 0.5;
    z-index: 99;
    overflow: hidden;
`;
const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

export interface ModalProps{
    visible: boolean;
    overlayClose?: boolean;
    onClose(): void;
}

const Portal:React.FC = ({children}) => {
    const rootElement = document.getElementById("modal") as Element;   
    return createPortal(children, rootElement);
}

const Modal: React.FC<ModalProps> = ({visible, overlayClose = true, onClose, children}) => {
    const onOverlayClick = () => {
        if(overlayClose){
            onClose();
        }
    }
    
    if(visible){
        return (
            <Portal>
                <Overlay onClick={onOverlayClick}/>
                <Wrapper>
                    {children}
                </Wrapper>
            </Portal>
        )
    }
    return null;
    
}

export default Modal;