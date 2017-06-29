import React from 'react';
import SidebarRight from '../../src/components/SidebarRight/SidebarRight.js';
import renderer from 'react-test-renderer';

it('SidebarRight component renders correctly with no data', () => {
    const component = shallow(<SidebarRight/>);
    expect(component).toMatchSnapshot();
});
