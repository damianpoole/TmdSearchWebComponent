import React from 'react';
import { shallow } from 'enzyme';
import MovieItem from './MovieItem';

it('renders without crashing', () => {
    shallow(<MovieItem />);
});

it('renders the title', () => {
    const el = shallow(<MovieItem title="Jason Bourne" />);
    expect(el.contains(<h2>Jason Bourne</h2>)).toEqual(true);
});

describe('Movie details', () => {
    const RELEASEDATE = '1st January 2018';
    const OVERVIEW = 'This is the movie overview';

    let el;

    beforeEach(() => {
        el = shallow(
            <MovieItem
                title="Jason Bourne"
                releaseDate={RELEASEDATE}
                overview={OVERVIEW}
            />
        );
    });

    it('Should not initially render the details', () => {
        const release = <p className="releaseDate">{RELEASEDATE}</p>;
        const overview = <p className="overview">{OVERVIEW}</p>;

        expect(el.contains(release)).toEqual(false);
        expect(el.contains(overview)).toEqual(false);
    });

    it('Should show the details once the button is clicked', () => {
        el.instance().toggleDetails();

        const release = <p className="releaseDate">{RELEASEDATE}</p>;
        const overview = <p className="overview">{OVERVIEW}</p>;

        expect(el.contains(release)).toEqual(true);
        expect(el.contains(overview)).toEqual(true);
    });
});
