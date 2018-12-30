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

    it('Should not initially have the modal being visible', () => {
        expect(el.find('Modal').props().show).toEqual(false);
    });

    it('Should show the details once the button is clicked', () => {
        el.instance().showModal();

        expect(el.find('Modal').props().show).toEqual(true);
    });
});
