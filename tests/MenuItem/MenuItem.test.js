import React from 'react';
import MenuItem from '../../src/components/Menu/MenuItem.js';

it('MenuItem component renders correctly with no data', () => {
    const component = shallow(<MenuItem/>);
    expect(component).toMatchSnapshot();
});
