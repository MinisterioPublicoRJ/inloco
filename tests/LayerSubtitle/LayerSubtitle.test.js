import React from 'react';
import LayerSubtitle from '../../src/components/LayerSubtitle/LayerSubtitle.js';
import renderer from 'react-test-renderer';

it('LayerSubtitle component renders correctly with no data', () => {
    const component = shallow(<LayerSubtitle/>);
    expect(component).toMatchSnapshot();
});
