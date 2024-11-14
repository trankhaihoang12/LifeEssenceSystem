import React from 'react';
import { StyledModal } from './Style';


function ModalComponent({ title = 'Modal', isOpen = false, children, ...rests }) {
    return (
        <StyledModal title={title} open={isOpen} {...rests}>
            {children}
        </StyledModal>
    );
}

export default ModalComponent;