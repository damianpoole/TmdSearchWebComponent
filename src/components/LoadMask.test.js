import React from 'react';
import { shallow } from 'enzyme';
import LoadMask from './LoadMask';

it('Renders without crashing', () => {
    shallow(<LoadMask />);
});
