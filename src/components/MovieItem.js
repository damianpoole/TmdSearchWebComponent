import React, { Component } from 'react';
import './MovieItem.scss';

class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };

        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render() {
        const showDetails = this.state.showDetails;

        return (
            <div
                className={showDetails ? 'movieItem active' : 'movieItem'}
                onClick={this.toggleDetails}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w200${
                        this.props.imageUrl
                    }`}
                />
                {showDetails && (
                    <div className="details">
                        <h2>{this.props.title}</h2>
                        <p className="releaseDate">{this.props.releaseDate}</p>
                        <p className="overview">{this.props.overview}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MovieItem;
