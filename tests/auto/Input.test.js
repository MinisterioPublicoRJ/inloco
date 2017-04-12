import renderer from react-test-renderer
it('componente renderiza corretamente', () => {
    const input = shallow(<Input/>);
    expect(input).toMatchSnapshot();
})
