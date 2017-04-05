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
