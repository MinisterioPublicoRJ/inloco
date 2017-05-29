import React from 'react';
import Menu from '../../src/components/Menu/Menu.js';

it('Menu component renders correctly', () => {
    const menu  = shallow(<Menu/>);
    expect(menu).toMatchSnapshot();
});
