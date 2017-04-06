import React from 'react';
import Highcharts from 'highcharts';

/**
 * Componente Example que representa a aplicação
 */

export default class ExampleHighcharts extends React.Component {
    componentDidMount () {
        // Extend Highcharts with modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
    }
    /**
     * renderiza o elemento
     * @return html de marcação do elemento
     */
    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }
    //Create the div which the chart will be rendered to.
    render () {
        return (
            <div id={this.props.container}> </div>
        );
    }
}
