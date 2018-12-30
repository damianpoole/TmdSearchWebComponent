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

        this.searchInput = React.createRef();

        this.search = this.search.bind(this);
        this.searchBtnClick = this.searchBtnClick.bind(this);
    }

    search(e) {
        const value = e.target.value;
        const canSearch = e.key === 'Enter' && value !== this.lastQuery;

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

    searchBtnClick() {
        this.performSearch(this.searchInput.current.value);
    }

    updateMovies(data) {
        const movies = data
            .filter(x => x.release_date !== '')
            .filter(x => x.poster_path !== null);

        this.setState((previousState, currentProps) => {
            return { movies, isLoading: false };
        });
    }

    render() {
        return (
            <div className="App">
                <div className="search">
                    <label htmlFor="search">Search by movie title</label>
                    <div className="flex-container">
                        <input
                            id="search"
                            onKeyDown={this.search}
                            placeholder="Movie title..."
                            ref={this.searchInput}
                        />
                        <button onClick={this.searchBtnClick}>Search</button>
                    </div>
                </div>

                <div className="results">
                    {this.state.movies.map(movie => (
                        <MovieItem
                            key={movie.id.toString()}
                            title={movie.title}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                            imageUrl={movie.poster_path}
                            backgroundImage={movie.backdrop_path}
                        />
                    ))}
                </div>

                <LoadMask visible={this.state.isLoading} />
            </div>
        );
    }
}

export default App;
