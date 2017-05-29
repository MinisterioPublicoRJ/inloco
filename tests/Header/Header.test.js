import React from 'react';
import Header from '../../src/components/Header/Header.js';

it('Header component renders correctly', () => {
    const header  = shallow(<Header/>);
    expect(header).toMatchSnapshot();
});
