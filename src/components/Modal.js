import React, { Component } from 'react';
import './Modal.scss';

const Modal = ({ handleClose, show, children }) => {
    const classname = show ? 'modal visible' : 'modal';

    return (
        <div className={classname}>
            <section>
                <button onClick={handleClose}>Close</button>
                {children}
            </section>
        </div>
    );
};

export default Modal;
