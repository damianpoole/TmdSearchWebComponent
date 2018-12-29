import React, { Component } from 'react';
import MovieItem from './components/MovieItem';
import './App.css';
import { search } from './tmd';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.lastQuery = '';

        this.search = this.search.bind(this);
    }

    search(e) {
        const value = e.target.value;
        const key = e.keyCode;
        const canSearch =
            key >= 48 &&
            key <= 90 &&
            value.length >= 3 &&
            value != this.lastQuery;

        this.lastQuery = value;

        canSearch
            ? search(value).then(this.updateMovies.bind(this))
            : this.updateMovies([]);
    }

    updateMovies(data) {
        this.setState((previousState, currentProps) => {
            return { movies: data };
        });
    }

    render() {
        return (
            <div className="App">
                <div className="search">
                    <input onKeyDown={this.search} />
                </div>

                <div className="results">
                    {this.state.movies.map(movie => (
                        <MovieItem
                            key={movie.id.toString()}
                            title={movie.title}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
