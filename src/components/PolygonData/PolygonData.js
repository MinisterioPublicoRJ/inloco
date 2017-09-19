import React from 'react'
import Charts from '../Charts/Charts.js'

const PolygonData = ({ polygonData }) => {

    let populacao = polygonData.filter(l => l.category === "População")[0]
    console.log("popula", populacao)

    let columns = []
    let keys = Object.keys(populacao.piramide_total)

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let splittedKey = key.split('_')
        columns.push(
            [splittedKey[1]+'-'+splittedKey[2], key]
        )

    }

    let chartObject = {
        "charts": [
            {
                columns,
                "entity": "População",
                "title": "Pirâmide Etária",
                "type": "piramide"
            }
        ],
        "features": [
            {
                "properties": Object.assign({}, populacao.piramide_total)
            }
        ],
    }

    console.log(chartObject)

    return (
        <div className="layer-item selected module-polygon-data">
            <div className="layer-item-header">
                <h2 className="layer-item-header--title">
                    Dados do polígono
                </h2>
            </div>
            <div className="layer-item-body">
                <table className="data-table">
                    <tbody>
                        {
                            polygonData.map( (l, index) => {
                                let title = l.category
                                let value = l.items.length
                                if(l.category === "População"){
                                    value = l.populacao_total
                                }
                                return (
                                    <tr key={index}>
                                        <td className="layer-item-more-info--title">{title}</td>
                                        <td className="layer-item-more-info--style-title">{value}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Charts layer={chartObject}/>
            </div>
        </div>
    )
}

export default PolygonData
