import React from 'react';
import Input from '../input/Input.js';
import LeafletMap from '../LeafletMap/LeafletMap.js';

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
            <div className="module-app">
                <LeafletMap />
            </div>
        );
    }
}
