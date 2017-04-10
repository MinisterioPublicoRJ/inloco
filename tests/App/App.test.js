import React from 'react';
import App from '../../src/components/App/App.js';
import renderer from 'react-test-renderer';

it('componente renderiza corretamente', () => {
    const app  = shallow(<App/>);
    expect(app).toMatchSnapshot();
});
