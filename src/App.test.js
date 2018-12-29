import React from 'react';
import { shallow } from 'enzyme';
import * as tmd from './tmd';
import App from './App';

it('renders without crashing', () => {
    shallow(<App />);
});

describe('Search input', () => {
    let el, spy;

    beforeEach(() => {
        spy = jest.spyOn(tmd, 'search').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([{ id: 1 }, { id: 2 }]);
            });
        });
        el = shallow(<App />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // TODO: Work out how to test the async nature better.

    it('Should search only if value is longer than 2 character', () => {
        el.instance().search({
            keyCode: 65,
            target: {
                value: 'abc'
            }
        });

        expect(spy).toBeCalled();

        setTimeout(function() {
            expect(el.update().find('MovieItem').length).toEqual(2);
        }, 100);
    });

    it('Should clear the search results if value is less than 3', done => {
        el.instance().search({
            keyCode: 65,
            target: {
                value: 'abc'
            }
        });

        function reset() {
            el.instance().search({
                keyCode: 65,
                target: {
                    value: ''
                }
            });

            setTimeout(function() {
                expect(el.update().find('MovieItem').length).toEqual(0);
                done();
            });
        }

        setTimeout(function() {
            expect(el.update().find('MovieItem').length).toEqual(2);
            reset();
        }, 100);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should not search again if the value hasn't changed", () => {
        const instance = el.instance();

        instance.search({
            keyCode: 65,
            target: {
                value: 'abc'
            }
        });

        instance.search({
            keyCode: 65,
            target: {
                value: 'abc'
            }
        });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should ignore any keyboard press other than a-z', () => {
        const input = el.find('input');
        input.value = 'ab';

        input.simulate('keyDown', {
            keyCode: 37,
            which: 37,
            target: { value: 'abc' }
        });

        expect(spy).not.toBeCalled();
    });
});
