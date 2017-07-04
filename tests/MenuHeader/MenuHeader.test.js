import React from 'react';
import MenuHeader from '../../src/components/MenuHeader/MenuHeader.js';

it('MenuHeader component renders correctly with no data', () => {
    const component = shallow(<MenuHeader/>);
    expect(component).toMatchSnapshot();
});
