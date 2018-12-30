import React, { Component } from 'react';
import MovieItem from './components/MovieItem';
import './App.scss';
import { search } from './tmd';
import LoadMask from './components/LoadMask';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: false
        };

        this.lastQuery = '';

        this.search = this.search.bind(this);
    }

    search(e) {
        const value = e.target.value;
        const canSearch = e.key === 'Enter' && value != this.lastQuery;

        this.lastQuery = value;

        if (canSearch) {
            this.performSearch(value);
        }
    }

    performSearch(value) {
        this.setState({
            isLoading: true
        });

        search(value).then(this.updateMovies.bind(this));
    }

    updateMovies(data) {
        this.setState((previousState, currentProps) => {
            return { movies: data, isLoading: false };
        });
    }

    render() {
        return (
            <div className="App">
                <div className="search">
                    <input
                        onKeyDown={this.search}
                        placeholder="Search by movie title..."
                    />
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

                <LoadMask visible={this.state.isLoading} />
            </div>
        );
    }
}

export default App;
