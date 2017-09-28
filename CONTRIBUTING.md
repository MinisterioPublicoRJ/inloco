# Contributing

Our development objectives and open issues are all public on [GitHub issues](https://github.com/MinisterioPublicoRJ/inLoco-2.0/issues). Pull requests are welcome!

Optionally, you can install [ZenHub](https://github.com/marketplace/zenhub) plugin (available on Chrome and Firefox) to see development plan board, see issues already in progress etc.

## Running
The development build (`npm start`) will also start docs build (esdoc). This docs build will compile all components docs and show a webpage. To access it just:
1. `$ npm start`
1. Access url `http://localhost:3000/`

Docs
1. Access url `http://localhost:3000/esdoc/`

Other options are:

### Production mode

```
$ npm run prod
```

### Production build (without running server)

```
$ npm run build
```

### Run tests

```
$ npm install -g jest
$ npm run test
```
If you get error with jest, try running `jest --no-cache`

### Running on mock mode
This mode does not call the geoserver, instead it simulates geoserver calls.

```
$ npm run mock
```

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
We use JSDoc to document components. For each component we write:
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
