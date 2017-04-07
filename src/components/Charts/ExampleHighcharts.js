import React from 'react';
import Highcharts from 'highcharts';

/**
 * Componente ExampleHighcharts que representa um gráfico da biblioteca Highcharts.js
 */

export default class ExampleHighcharts extends React.Component {
    /**
     * cria o gráfico após renderizar o componente
     */
    componentDidMount () {
        // Extende o highcharts com módulos
        console.log(this);
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Cria o gráfico passando o container onde o gráfico será renderizado
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
        console.log(this.chart);
    }
    /**
     * destrói o gráfico antes da remoção do componente
     */
    componentWillUnmount() {
        this.chart.destroy();
    }
    /**
     * renderiza o elemento que conterá o gráfico
     * @return html de marcação do elemento
     */
    render () {
        return (
            <div id={this.props.container} className="chart"></div>
        );
    }
}
