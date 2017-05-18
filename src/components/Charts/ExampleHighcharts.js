import React from 'react';
import Highcharts from 'highcharts';

/**
 * Represents a chart using Highcharts.js lib
 */

export default class ExampleHighcharts extends React.Component {
    /**
     * Creates the chart after rendering the component
     */
    componentDidMount () {
        // Extends highcharts with modules
        console.log(this);
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Creates the graph passing the container where the graph will be rendered
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
        console.log(this.chart);
    }
    /**
     * Destroys the graph before component removal
     */
    componentWillUnmount() {
        this.chart.destroy();
    }
    /**
     * renders the element that will contain the graph
     * @return HTML markup of the element
     */
    render () {
        return (
            <div id={this.props.container} className="chart"></div>
        );
    }
}
