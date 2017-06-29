import React from 'react';
import LayerStyleItem from '../../src/components/LayerStylesCarousel/LayerStyleItem.js';
import renderer from 'react-test-renderer';

it('LayerStyleItem component renders correctly with no data', () => {
    const component = shallow(<LayerStyleItem/>);
    expect(component).toMatchSnapshot();
});
