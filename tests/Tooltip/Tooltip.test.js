import React from 'react';
import Tooltip from '../../src/components/Tooltip/Tooltip.js';
import renderer from 'react-test-renderer';

it('component renders correctly', () => {
    const tooltip  = shallow(<Tooltip/>);
    expect(tooltip).toMatchSnapshot();
});
