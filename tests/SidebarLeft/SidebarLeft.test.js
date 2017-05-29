import React from 'react';
import SidebarLeft from '../../src/components/SidebarLeft/SidebarLeft.js';
import renderer from 'react-test-renderer';

it('SidebarLeft component renders correctly', () => {
    const sidebarLeft  = shallow(<SidebarLeft/>);
    expect(sidebarLeft).toMatchSnapshot();
});
