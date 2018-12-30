import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
    listenKeyboard(e) {
        if (e.key === 'Escape') {
            this.props.handleClose();
        }
    }

    componentDidMount() {
        if (this.props.handleClose) {
            window.addEventListener(
                'keydown',
                this.listenKeyboard.bind(this),
                true
            );
        }
    }

    componentWillUnmount() {
        if (this.props.handleClose) {
            window.removeEventListener(
                'keydown',
                this.listenKeyboard.bind(this),
                true
            );
        }
    }

    render() {
        const classname = this.props.show ? 'modal visible' : 'modal';

        return (
            <div className={classname}>
                <section>
                    <button onClick={this.props.handleClose}>Close</button>
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default Modal;
