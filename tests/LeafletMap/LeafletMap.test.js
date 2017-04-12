import React from 'react';
import LeafletMap from '../../src/components/LeafletMap/LeafletMap.js';
import renderer from 'react-test-renderer';

it('componente renderiza corretamente', () => {
    const leafletMap  = shallow(<LeafletMap/>);
    expect(leafletMap).toMatchSnapshot();
});