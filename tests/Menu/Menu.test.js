import React from 'react';
import Menu from '../../src/components/Menu/Menu.js';

it('Menu component renders correctly with no data', () => {
    const component = shallow(<Menu/>);
    expect(component).toMatchSnapshot();
});
