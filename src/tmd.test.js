'use strict';

const tmd = require('./tmd.js');

it('Should return an empty array with zero length query', async () => {
    const data = await tmd.search('');
    expect(data.length).toEqual(0);
});

it('Should return an empty array when passing no query', async () => {
    const data = await tmd.search();
    expect(data.length).toEqual(0);
});

it('Should return the correct movie title in the first result', async () => {
    const data = await tmd.search('Jack Reacher');
    expect(data[0].original_title).toBe('Jack Reacher');
});

it('Should return multiple movies in the result', async () => {
    const data = await tmd.search('Jack Reacher');
    expect(data.length).toBe(2);
});
