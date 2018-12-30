import React from 'react';
import { shallow } from 'enzyme';
import * as tmd from './tmd';
import App from './App';

it('renders without crashing', () => {
    shallow(<App />);
});

describe('Search input', () => {
    let el, spy, input;

    beforeEach(() => {
        spy = jest.spyOn(tmd, 'search').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([{ id: 1 }, { id: 2 }]);
            });
        });
        el = shallow(<App />);
        input = el.find('input');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const performSearch = () => {
        input.simulate('keyDown', {
            keyCode: 13,
            which: 13,
            key: 'Enter',
            target: { value: 'test' }
        });
    };

    // TODO: Work out how to test the async nature better.

    it('Should search when enter is pressed', () => {
        input.value = 'test';

        performSearch();

        expect(spy).toBeCalled();

        setTimeout(function() {
            expect(el.update().find('MovieItem').length).toEqual(2);
        }, 100);
    });

    it('Should clear the search results if value is empty', () => {
        el.instance().setState({
            movies: [{ id: 1 }, { id: 2 }]
        });
        expect(el.update().find('MovieItem').length).toEqual(2);

        input.value = '';
        performSearch();

        setTimeout(function() {
            expect(el.update().find('MovieItem').length).toEqual(0);
        }, 100);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should not search again if the value hasn't changed", () => {
        input.value = 'test';

        performSearch();
        performSearch();

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
