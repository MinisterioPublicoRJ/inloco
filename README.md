# In Loco 2.0
_In the place; in the proper or natural place._

A Geographic Information System (GIS) used by [Ministério Público do Estado do Rio de Janeiro](http://www.mprj.mp.br/) to show social, institutional and administrative data, made with [React](https://facebook.github.io/react/) and [Leaflet](http://leafletjs.com/), interacting with a public [GeoServer](http://geoserver.org/) backend.

See it live: http://apps.mprj.mp.br/sistema/inloco

![image](https://user-images.githubusercontent.com/397851/30930156-25dbd42e-a397-11e7-8e7f-80c83cdddccd.png)

## Contributing

Our development objectives and open issues are all public on [GitHub issues](https://github.com/MinisterioPublicoRJ/inLoco-2.0/issues). Pull requests are welcome!

Optionally, you can install [ZenHub](https://github.com/marketplace/zenhub) plugin (available on Chrome and Firefox) to see development plan board, see issues already in progress etc.

## Installing
1. Clone the project or [download it](https://github.com/MinisterioPublicoRJ/inLoco-2.0/archive/develop.zip) to your computer.
1. Make sure you have [Node.js and npm](https://nodejs.org/en/download/) installed.
1. On Windows, install [.NET Framework 2.0 SDK](https://www.microsoft.com/en-us/download/confirmation.aspx?id=15354) (Sass build dependency)
1. If needed be, configure npm proxy
1. Run `npm install`
    1. _Note: currently this step fails when running on [Windows Subsystem for Linux](https://blogs.msdn.microsoft.com/commandline/learn-about-bash-on-windows-subsystem-for-linux/)._
1. This project uses [EditorConfig](http://editorconfig.org/) to configure its code standards, please use the appropriate plugin on your IDE or text editor.

## Running

### On development mode

```
$ npm start
```

### On production mode

```
$ npm run prod
```

### Production build

```
$ npm run build
```

### Run tests

```
$ npm install -g jest
$ npm run test
```
If you get error with jest, try running `jest --no-cache`

### On mock mode
This mode does not call the geoserver, instead it simulates geoserver calls.

```
$ npm run mock
```

# Read project documentation
The development build (`npm start`) will also start docs build (esdoc). This docs build will compile all components docs and show a webpage. To access it just:
1. `$ npm start`
1. Access url `http://localhost:3000/esdoc/`

## Testing
The tests environment was made using [jest](https://facebook.github.io/jest/) and [enzyme](https://github.com/airbnb/enzyme). At first, we're doing the following test types:
1. Component rendering with [Snapshot test](https://facebook.github.io/jest/docs/snapshot-testing.html). Example:

```javascript
import React from 'react';
import App from '../../src/components/App/App.js';
import renderer from 'react-test-renderer';

it('component renders correctly', () => {
    const app  = shallow(<App/>);
    expect(app).toMatchSnapshot();
});
```

2. Property tests (props)
3. Events tests

### How to run all tests
`$ npm run test` : run all tests

`$ npm run test:watch` : run all tests right now and also when some component change

`$ npm run test:coverage` : run all tests and show coverage information

## Documenting
In order to contribute with the project, it is needed to documment the components. For each component we need to write:
1. Basic description of what the component is, soon after component class declaration, write the description with a comment:
    ```javascript
    /**
     * App component that represents the application
     */
     ```
1. What every component method does and what it returns, right after module declaration
    ```javascript
    /**
     * renders the element
     * @return html markup of the element
     */
     ```

Just like on following example, with App class.
```javascript
import React from 'react';
import Input from '../input/Input.js';

require('./app.scss');

/**
 * App component that represents the application
 */

export default class App extends React.Component {
    /**
     * renders the element
     * @return html markup of the element
     */
    render() {
        return (
            <div style={{textAlign: 'center'}} className="module-app">
                <h1>Hello World</h1>
                <Input />
                <hr />
            </div>
        );
    }
}
```

# Team

## Development

- [Arlindo Pereira](https://www.linkedin.com/in/arlindosaraivapereira/) ([@nighto](https://github.com/nighto))
- [Daniel Belchior](https://www.linkedin.com/in/danielbelchior/) ([@danielbelchior](https://github.com/danielbelchior))
- [Gabriel Barbier](https://www.linkedin.com/in/gabrielbarbier/) ([@barbier](https://github.com/barbier))
- [Luciano Baraúna](https://www.linkedin.com/in/lucianobarauna/) ([@lucianobarauna](https://github.com/lucianobarauna))
- [Rafael Lage Tavares](https://www.linkedin.com/in/rltrafael/) ([@rlage](https://github.com/rlage))

#### Formerly

- [Pedro Marins](https://www.linkedin.com/in/pedromarins/) ([@pedromarins](https://github.com/pedromarins))

## Geography

- [Fellipe Figueiredo Silva](https://www.linkedin.com/in/fellipe-figueiredo-silva-9a8981106/)
- [Frederico José Basilio do Nascimento](https://www.linkedin.com/in/frederico-nascimento-b214262b/)
- [Pedro Henrique de Magalhães Casimiro](https://www.linkedin.com/in/pedro-henrique-de-magalh%C3%A3es-casimiro-7b7b4512a/)
- [Rodrigo Sá de Araujo](https://www.linkedin.com/in/rodrigo-araujo-61338a141/)

#### Formerly

- Maria Pandolfi Guerreiro
- [Renato de Lima Hingel](https://www.linkedin.com/in/renato-hingel-51651a35/)

## Statistics

- [Cristiane Ramos Justen](https://www.linkedin.com/in/cristiane-ramos-justen-145451122/)
- [Nicole Peçanha do Rêgo Barros](http://lattes.cnpq.br/0330661247598507)
