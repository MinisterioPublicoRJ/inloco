import React from 'react';
import Tooltip from '../../src/components/Tooltip/Tooltip.js';
import renderer from 'react-test-renderer';

it('Tooltip component renders correctly with no data', () => {
    const component = shallow(<Tooltip/>);
    expect(component).toMatchSnapshot();
});

it('Tooltip component renders correctly with real data', () => {
    let tooltip = {
        "text":"Índice de Desenvolvimento da Educação Básica (IDEB) da rede estadual de educação. Leitura da tabela: I (Anos Iniciais), F (Anos Finais), E (Estadual), M (Municipal), P (Pública). Fonte: INEP Ano: 2015","show":true,"sidebarLeftWidth":300,"parentHeight":33,"top":230
    }

    const component = shallow(<Tooltip tooltip={tooltip}/>);
    expect(component).toMatchSnapshot();
});
