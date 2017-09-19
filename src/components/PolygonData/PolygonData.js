import React from 'react'

const PolygonData = ({ polygonData }) => {
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
            </div>
        </div>
    )
}

export default PolygonData
