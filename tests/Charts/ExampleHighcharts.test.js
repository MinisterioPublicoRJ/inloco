import React from 'react';
import ExampleHighcharts from '../../src/components/Charts/ExampleHighcharts.js';
import renderer from 'react-test-renderer';

it('Charts component renders correctly', () => {
    const exampleHighcharts  = shallow(<ExampleHighcharts/>);
    expect(exampleHighcharts).toMatchSnapshot();
});
