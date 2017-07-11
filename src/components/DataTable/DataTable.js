import React from 'react'

const COLLAPSED_COLUMNS_COUNT = 3

const DataTable = ({layer, isCollapsed}) => {

    if (!layer.features) {
        return null
    }
    return (
        <table className="data-table">
            <thead>
                <tr>
                    {
                        // Iterating over first feature object to get properties keys
                        Object.keys(layer.features[0].properties).map((property, index) => {
                            if (isCollapsed && index >= COLLAPSED_COLUMNS_COUNT) {
                                return null
                            }

                            return <th className="data-table--header" key={index}>{property.replace(/_/g," ")}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    // Iterating over features to get content
                    layer.features.map((feature, indexFeature) => {
                        return (<tr className="data-table--row" key={indexFeature}>
                            {
                                // Iterating over properties of a single feature
                                Object.keys(feature.properties).map((property, indexProperty) => {
                                    if (isCollapsed && indexProperty >= COLLAPSED_COLUMNS_COUNT) {
                                        return null
                                    }

                                    return <td className="data-table--body" key={indexProperty}>{feature.properties[property]}</td>
                                })
                            }
                        </tr>)
                    })
                }
            </tbody>
        </table>
    )
}

export default DataTable
