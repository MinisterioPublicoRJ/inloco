import React from 'react';
import MenuItem from '../../src/components/Menu/MenuItem.js';

it('MenuItem component renders correctly', () => {
    const menuItem  = shallow(<MenuItem/>);
    expect(menuItem).toMatchSnapshot();
});
