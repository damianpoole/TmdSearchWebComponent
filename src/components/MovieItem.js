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
            <div className={showDetails ? 'movieItem active' : 'movieItem'}>
                <h2>{this.props.title}</h2>
                <button onClick={this.toggleDetails}>
                    {showDetails ? 'Collapse' : 'Expand'}
                </button>
                {showDetails && (
                    <div className="details">
                        <p className="releaseDate">{this.props.releaseDate}</p>
                        <p className="overview">{this.props.overview}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MovieItem;
