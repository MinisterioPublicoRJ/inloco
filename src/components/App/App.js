import React from 'react';
import Input from '../input/Input.js';

require('./app.scss');

export default class App extends React.Component {
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
