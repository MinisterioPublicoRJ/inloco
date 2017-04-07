# In Loco 2.0

Plataforma digital que reúne em um banco de dados informações sociais, institucionais e administrativas, relacionadas ao MP-RJ.

# Por que?

# Como instalar
1. Faça o clone do projeto para a sua máquina.
1. Instale o [.NET Framework 2.0 SDK](https://www.microsoft.com/en-us/download/confirmation.aspx?id=15354) (dependência do build do Sass)
1. Configure o proxy do npm para a máquina do Luiz [(instruções no Trello)](https://trello.com/c/mA3muQy4/28-configurando-proxies-git-npm-vscode-urls)
1. Rode o comando `npm install`.
1. Se estiver usando o vscode, faça o download do plugin do vscode para o EditorConfig, [clique aqui] (https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
1. Se não conseguir fazer o download do plugin, siga o passo a passo [aqui no Trello] (https://trello.com/c/GQERO8y7/20-configurando-proxy-para-fazer-download-de-extensoes-usando-o-vs-code) para configurar o proxy.

# Como rodar

## Em modo desenvolvimento

```
$ npm start
```

## Em modo produção

```
$ npm run prod
```

## Build de produção

```
$ npm run build
```

# Testes
O ambiente de testes do projeto foi montado usando as bibliontecas [jest](https://facebook.github.io/jest/) e [enzyme](https://github.com/airbnb/enzyme).
A princípio, iremos realizar os seguintes tipos de testes:
1. Renderização do componente com o [Snapshot test](https://facebook.github.io/jest/docs/snapshot-testing.html). Exemplo:

```
import React from 'react';
import App from '../../src/components/App/App.js';
import renderer from 'react-test-renderer';

it('componente renderiza corretamente', () => {
    const app  = shallow(<App/>);
    expect(app).toMatchSnapshot();
});
```

1. Teste de propriedades (props)
1. Teste de eventos

## Como rodar os testes
`$ npm run test` : executa todos os testes

`$ npm run test:watch` : executa todos os testes na hora e também quando algum componente mudar

`$ npm run test:coverage` : executa todos os testes na hora e dados da cobertura dos testes

[Mais informações sobre testes](https://trello.com/c/NbcNSRtb/15-artigos)

# Documentação
Para contribuir com o projeto, é necessário documentar os componentes. Para cada componente, precisamos escrever:
1. Descrição básica do que é aquele componente, logo antes da declaração da classe do componente, escreva a descrição como um comentário:
    ```
    /**
     * Componente App que representa a aplicação
     */
     ```
1. O que cada método do componente faz e o que ele retorna, logo antes da declaração do método
    ```
    /**
     * renderiza o elemento
     * @return html de marcação do elemento
     */
     ```

Assim como no exemplo abaixo, com a classe App.
```
import React from 'react';
import Input from '../input/Input.js';

require('./app.scss');

/**
 * Componente App que representa a aplicação
 */

export default class App extends React.Component {
    /**
     * renderiza o elemento
     * @return html de marcação do elemento
     */
    render() {
        return (
            <div style={{textAlign: 'center'}} className="module-app">
                <h1>Hello World 30</h1>
                <Input />
                <hr />
            </div>
        );
    }
}
```
# Visualizar a documentação do projeto
O build de desenvolvimento (npm start) já irá executar o build de documentação (esdoc). Esse build de documentação irá montar toda a documentação que a equipe fizer nos componentes e apresentar como uma página web. Para acessá-la basta:
1. Executar o comando npm start
1. Acessar a url `http://localhost:3000/esdoc/`


# Licença
