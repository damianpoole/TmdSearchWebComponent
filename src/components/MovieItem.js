import React, { Component } from 'react';
import './MovieItem.scss';
import Modal from './Modal';

class MovieItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        if (!this.state.show) {
            this.setState({
                show: true
            });
        }
    }

    hideModal() {
        this.setState((state, props) => ({
            show: false
        }));
    }

    render() {
        const backgroundImage = this.props.backgroundImage;

        return (
            <div className="movieItem" onClick={this.showModal}>
                <img
                    src={`https://image.tmdb.org/t/p/w200${
                        this.props.imageUrl
                    }`}
                />
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className="details">
                        <h2>{this.props.title}</h2>
                        <p className="releaseDate">
                            Released on {this.props.releaseDate}
                        </p>
                        {backgroundImage && (
                            <img
                                align="right"
                                src={`https://image.tmdb.org/t/p/w400${backgroundImage}`}
                            />
                        )}
                        <p className="overview">{this.props.overview}</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MovieItem;
