import React from 'react';
import LeafletMap from '../LeafletMap/LeafletMap.js';
import Menu from '../Menu/Menu.js';
import ExampleHighcharts from '../Charts/ExampleHighcharts.js';
import GeoAPI from '../Api/GeoAPI.js';

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

    componentDidMount() {
        console.log('app.js', this.props.menu);
    }

    componentWillReceiveProps() {

    }

    /**
     * renderiza o elemento
     * @return html de marcação do elemento
     */

    render() {
        return (
            <div className="module-app">
                <Menu items={this.props.menu} hasSubItem={true} subItemPropName={'camadas'}/>
                <LeafletMap />
            </div>
        );
    }
}
