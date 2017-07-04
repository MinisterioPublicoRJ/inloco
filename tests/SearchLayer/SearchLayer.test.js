import React from 'react';
import SearchLayer from '../../src/components/SearchLayer/SearchLayer.js';
import renderer from 'react-test-renderer';

it('SearchLayer component renders correctly with no data', () => {
    const component = shallow(<SearchLayer/>);
    expect(component).toMatchSnapshot();
});
