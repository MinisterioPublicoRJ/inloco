import React from 'react';
import MenuHeader from '../../src/components/MenuHeader/MenuHeader.js';

it('MenuHeader component renders correctly', () => {
    const menuHeader  = shallow(<MenuHeader/>);
    expect(menuHeader).toMatchSnapshot();
});
