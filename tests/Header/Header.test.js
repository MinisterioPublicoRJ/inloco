import React from 'react';
import Header from '../../src/components/Header/Header.js';

it('Header component renders correctly with no data', () => {
    const component = shallow(<Header/>);
    expect(component).toMatchSnapshot();
});
