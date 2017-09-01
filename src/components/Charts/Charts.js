import React from 'react'
import {Bar, Line} from 'react-chartjs-2'

const Charts = ({ layer }) => {

    let colorsArray = [
        // red, green, blue
        {
            backgroundColor: 'rgba(255,0,0,.2)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,0,0,.4)',
            hoverBorderColor: 'rgba(255,0,0,1)',
        },
        {
            backgroundColor: 'rgba(0,255,0,.2)',
            borderColor: 'rgba(0,255,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,255,0,.4)',
            hoverBorderColor: 'rgba(0,255,0,1)',
        },
        {
            backgroundColor: 'rgba(0,0,255,.2)',
            borderColor: 'rgba(0,0,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,0,255,.4)',
            hoverBorderColor: 'rgba(0,0,255,1)',
        },
    ]

    const parseValue = (value) => {
        if (!value) {
            return 0
        }
        if (value === 'não informado') {
            return 0
        }
        return value
    }

    const dataObject = (chart, features) => {
        let dataObj = {
            labels: [],
            datasets: [],
        }

        // get chart labels
        for (var c = 0, lc = chart.columns.length; c < lc; c++) {
            dataObj.labels.push(chart.columns[c][0])
        }

        // if we have valid columns
        if (features) {
            for (let f = 0, lf = features.length; f<lf; f++) {
                // for each element on the chart
                let dataset = {
                    // get the element entity name
                    label: features[f].properties[chart.entity] || '',
                    data: [],
                    ...colorsArray[f],
                }

                // for each column
                for (let c = 0, lc = chart.columns.length; c<lc; c++) {
                    // get the value
                    dataset.data.push( parseValue(features[f].properties[chart.columns[c][1]]) )
                }

                dataObj.datasets.push(dataset)
            }
        }

        return dataObj
    }

    const chartJSX = (indexChart, chart, features) => {

        if (chart.type === 'barra') {
            return <Bar  data={dataObject(chart, features)} />
        }
        if (chart.type === 'linha') {
            return <Line data={dataObject(chart, features)} />
        }
        return <p>Gráfico com tipo não suportado.</p>
    }

    return (
        <div className="charts">
            {
                layer.charts.map((chart, indexChart) => {
                    return (
                        <div key={indexChart}>
                            <p>{chart.title}</p>
                            {chartJSX(indexChart, chart, layer.features)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Charts
