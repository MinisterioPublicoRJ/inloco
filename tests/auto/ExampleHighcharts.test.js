import renderer from react-test-renderer
it('componente renderiza corretamente', () => {
    const exampleHighcharts = shallow(<ExampleHighcharts/>);
    expect(exampleHighcharts).toMatchSnapshot();
})
