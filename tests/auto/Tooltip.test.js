import renderer from react-test-renderer
it('componente renderiza corretamente', () => {
    const tooltip = shallow(<Tooltip/>);
    expect(tooltip).toMatchSnapshot();
})
