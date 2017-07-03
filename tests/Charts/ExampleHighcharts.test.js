import React from 'react';
import ExampleHighcharts from '../../src/components/Charts/ExampleHighcharts.js';
import renderer from 'react-test-renderer';

it('Charts component renders correctly with no data', () => {
    const component = shallow(<ExampleHighcharts/>);
    expect(component).toMatchSnapshot();
});
