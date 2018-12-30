import React, { Component } from 'react';
import './LoadMask.scss';

class LoadMask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = `loadMask ${this.props.visible ? 'visible' : ''}`;

        return (
            <div className={classes}>
                <div className="spinner" />
            </div>
        );
    }
}

export default LoadMask;
