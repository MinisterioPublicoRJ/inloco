import React from 'react';
import Tooltip from '../../src/components/Tooltip/Tooltip.js';
import renderer from 'react-test-renderer';

it('Tooltip component renders correctly with no data', () => {
    const component = shallow(<Tooltip/>);
    expect(component).toMatchSnapshot();
});
