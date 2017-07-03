import React from 'react';
import SidebarLeft from '../../src/components/SidebarLeft/SidebarLeft.js';
import renderer from 'react-test-renderer';

it('SidebarLeft component renders correctly with no data', () => {
    const component = shallow(<SidebarLeft/>);
    expect(component).toMatchSnapshot();
});

it('SidebarLeft component renders correctly with real data -> menu open', () => {
    const component = shallow(<SidebarLeft showMenu={true}/>);
    expect(component).toMatchSnapshot();
});
