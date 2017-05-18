# In Loco 2.0
_In the place; in the proper or natural place._

A Geographic Information System (GIS) used by [Ministério Público do Estado do Rio de Janeiro](http://www.mprj.mp.br/) to show social, institutional and administrative data, based on [React](https://facebook.github.io/react/) and [Leaflet](http://leafletjs.com/), interacting with a [GeoServer](http://geoserver.org/) backend.


## How to install?
1. Clone the project or [download it](https://github.com/MinisterioPublicoRJ/inLoco-2.0/archive/develop.zip) to your machine.
1. On Windows, install [.NET Framework 2.0 SDK](https://www.microsoft.com/en-us/download/confirmation.aspx?id=15354) (Sass build dependency)
1. If needed be, configure npm proxy
1. Run `npm install`
1. This project uses [EditorConfig](http://editorconfig.org/) to configure its code standards, please use the appropriate plugin on your IDE or text editor.

## How to run

### Run tests

```
$ npm install -g jest
$ npm run test
```
If you get error with jest, try running `jest --no-cache`

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

## Tests
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

## Docs
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
# Read project documentation
The development build (`npm start`) will also start docs build (esdoc). This docs build will compile all components docs and show a webpage. To access it just:
1. `$ npm start`
1. Access url `http://localhost:3000/esdoc/`
