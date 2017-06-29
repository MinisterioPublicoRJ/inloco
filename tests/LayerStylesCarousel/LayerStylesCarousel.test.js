import React from 'react';
import LayerStylesCarousel from '../../src/components/LayerStylesCarousel/LayerStylesCarousel.js';
import renderer from 'react-test-renderer';

it('LayerStylesCarousel component renders correctly with no data', () => {
    const component = shallow(<LayerStylesCarousel/>);
    expect(component).toMatchSnapshot();
});
