import React from 'react';

import './Modal.scss';

const Modal = ({ isOpen,children }) => {

    return (
        <>
            {isOpen && (
                <div className="root">
                    <div className="modal">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;