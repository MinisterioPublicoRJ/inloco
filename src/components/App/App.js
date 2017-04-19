import React from 'react';
import Input from '../input/Input.js';
import LeafletMap from '../LeafletMap/LeafletMap.js';
import ExampleHighcharts from '../Charts/ExampleHighcharts.js';
import GeoAPI from '../Api/GeoAPI.js';
import axios from 'axios';

require('./app.scss');

/**
 * Componente App que representa a aplicação
 */

export default class App extends React.Component {

    /**
     * construtor do elemento
     */

    constructor() {
        super();
        this.options = {/*Highcharts options*/}
    }

    /**
     * realiza a chamada AJAX
     * @return log no console com os dados (se o browser não travar)
     */

    componentDidMount() {
        GeoAPI.getContent();
    }

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
                <LeafletMap />
            </div>
        );
    }
}
