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
        <div className="module-sinalid">
            <h3 className="layer-item-data--title">Sinalid - Desaparecidos</h3>
            {layer.features.map((feature, indexFeature) => {
                return (feature.properties.DP ?
                    <div key={indexFeature}>
                        <h4>{feature.properties.DP}ª DP: {feature.properties.sinalid ? feature.properties.sinalid.length : 'Não há'} desaparecidos</h4>
                        <h4>Gênero:</h4>
                        <Pie data={genderChart}/>
                        <h4>Idade:</h4>
                        <Bar data={ageRangeChart} options={ageRangeChartOptions}/>
                        <h4>Lista de pessoas:</h4>
                        {feature.properties.sinalid ? feature.properties.sinalid.map((missingPerson, indexMissingPerson) => {
                            return (
                                <div className="sinalid-card" key={indexMissingPerson}>
                                    <img className="sinalid-card--photo" src={'data:image/png;base64, ' + missingPerson.foto} alt={'Foto Desaparecido - ' + missingPerson.nome}/>
                                    <div className="sinalid-card--content">
                                        <div className="card-content-header">
                                        <p className="content-title">
                                            <i className="icon-sinalid icon-sinalid-user"></i>
                                            {missingPerson.nome}
                                        </p>
                                        <p className="content-date">
                                            Data de Desaparecimento:
                                            <span><i className="icon-sinalid icon-sinalid-calendar"></i>
                                            {missingPerson.desaparecimento}</span>
                                        </p>
                                        </div>
                                        <p className="card-content-text">{missingPerson.circunstancias}</p>
                                    </div>
                                </div>
                            )
                        }) : <p>Não há desaparecidos para esta delegacia.</p>}
                    </div>
                : null)
            })}
        </div>
    )
}

export default Sinalid
