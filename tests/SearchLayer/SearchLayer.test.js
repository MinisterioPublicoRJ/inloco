import React from 'react';
import SearchLayer from '../../src/components/SearchLayer/SearchLayer.js';
import renderer from 'react-test-renderer';

it('SearchLayer component renders correctly', () => {
    const searchLayer  = shallow(<SearchLayer/>);
    expect(searchLayer).toMatchSnapshot();
});
