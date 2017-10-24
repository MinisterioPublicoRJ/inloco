import React from 'react'
import {Pie, Bar} from 'react-chartjs-2'

const Sinalid = ({layer}) => {
    console.log('Sinalid layer', layer)

    // Empty stats
    let statInitialized = false
    let stats = {
        gender: {
            'MASCULINO': 0,
            'FEMININO': 0,
            'NÃO INFORMADO': 0,
        },
        ageRange: {
            '12 A 17 ANOS': 0,
            '18 A 24 ANOS': 0,
            '25 A 29 ANOS': 0,
            '30 A 34 ANOS': 0,
            '35 A 64 ANOS': 0,
            '65 ANOS OU MAIS': 0,
            'NÃO INFORMADA': 0,
        }
    }

    // Fill stats
    layer.features.map(feature => {
        feature.properties.sinalid ? feature.properties.sinalid.map(m => {
            statInitialized = true
            stats.gender[m.sexo]++
            stats.ageRange[m.faixa_IDADE]++
        }) : null
    })

    // Fill charts
    let genderChart = {
        labels: [
            'Masculino',
            'Feminino',
            '?',
        ],
        datasets: [
            {
                data: [
                    stats.gender['MASCULINO'],
                    stats.gender['FEMININO'],
                    stats.gender['NÃO INFORMADO'],
                ],
                backgroundColor: [
                    'rgba(0,0,255,.5)',
                    'rgba(255,0,0,.5)',
                    'rgba(0,0,0,.5)',
                ],
                hoverBackgroundColor: [
                    'rgba(0,0,255,1)',
                    'rgba(255,0,0,1)',
                    'rgba(0,0,0,1)',
                ],
            }
        ],
    }
    let ageRangeChart = {
        labels: [
            '12 a 17',
            '18 a 24',
            '25 a 29',
            '30 a 34',
            '35 a 64',
            '65+',
            '?',
        ],
        datasets: [
            {
                data: [
                    stats.ageRange['12 A 17 ANOS'],
                    stats.ageRange['18 A 24 ANOS'],
                    stats.ageRange['25 A 29 ANOS'],
                    stats.ageRange['30 A 34 ANOS'],
                    stats.ageRange['35 A 64 ANOS'],
                    stats.ageRange['65 ANOS OU MAIS'],
                    stats.ageRange['NÃO INFORMADA'],
                ],
                backgroundColor: [
                    'rgba(255,0,0,.5)',
                    'rgba(255,255,0,.5)',
                    'rgba(0,255,0,.5)',
                    'rgba(0,255,255,.5)',
                    'rgba(0,0,255,.5)',
                    'rgba(255,0,255,.5)',
                    'rgba(0,0,0,.5)',
                ],
                hoverBackgroundColor: [
                    'rgba(255,0,0,1)',
                    'rgba(255,255,0,1)',
                    'rgba(0,255,0,1)',
                    'rgba(0,255,255,1)',
                    'rgba(0,0,255,1)',
                    'rgba(255,0,255,1)',
                    'rgba(0,0,0,1)',
                ],
            },
        ],
    }

    // Remove empty values
    const removeEmptyValues = (obj) => {
        if (obj) {
            for (let i = obj.datasets[0].data.length - 1; i >= 0; i--) {
                if (obj.datasets[0].data[i] === 0) {
                    obj.labels.splice(i, 1)
                    obj.datasets[0].data.splice(i, 1)
                    obj.datasets[0].backgroundColor.splice(i, 1)
                    obj.datasets[0].hoverBackgroundColor.splice(i, 1)
                }
            }
        }
    }
    removeEmptyValues(genderChart)
    removeEmptyValues(ageRangeChart)

    let ageRangeChartOptions = {
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
    }

    console.log(statInitialized, stats)

    return (
        <div className="sinalid">
            <h3 className="layer-item-data--title">Sinalid - Desaparecidos</h3>
            {layer.features.map((feature, indexFeature) => {
                return (feature.properties.DP ?
                    <div key={indexFeature}>
                        <p>{feature.properties.DP}ª DP: {feature.properties.sinalid ? feature.properties.sinalid.length : 'Não há'} desaparecidos</p>
                        <p>Gênero:</p>
                        <Pie data={genderChart}/>
                        <p>Idade:</p>
                        <Bar data={ageRangeChart} options={ageRangeChartOptions}/>
                    </div>
                : null)
            })}
        </div>
    )
}

export default Sinalid
