import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';

export type ModalProps = {
    open: boolean;
    backgroundColor?: string;
};

const ModalContainer = styled.div<ModalProps>`
    height: 100%;
    width: 100%;
    visibility: ${({open}) => (open ? 'visible' : 'hidden')};
    background-color: ${({backgroundColor}) => backgroundColor};
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal: FunctionComponent<ModalProps> = ({backgroundColor = 'transparent', children, ...others}) => (
    <ModalContainer backgroundColor={backgroundColor} {...others}>
        {children}
    </ModalContainer>
);

export default Modal;
