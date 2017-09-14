import React from 'react'

// how many columns are visible when used within right sidebar
const COLLAPSED_COLUMNS_COUNT = 3

/**
 * Returns the correct property of layer to be shown on table.
 * @param {boolean} isCollapsed If DataTable is collapsed or not
 * @return {string}
 */
const featureType = (isCollapsed) => isCollapsed ? 'features' : 'modal'

/**
 * Returns an array of properties' keys to be used as table header
 * @param {Object} layer - Layer data.
 * @param {Array} [layer.table] - An array of strings specifying columns to be shown on the table. It can be undefined or not set.
 * @param {string} [layer.table[]] - A column name.
 * @param {Array} layer.features - Array of returned objects. By default only three objects are loaded when DataTable is used within SidebarRight.
 * @param {Object} layer.features[] - A returned object from GeoServer.
 * @param {Object} layer.features[].properties - An object with keys/values of this feature on GeoServer.
 * @param {boolean} isCollapsed If the table is collapsed (within right sidebar) or expanded (within modal).
 * @return {Array<String>} An array with the headers strings.
 */
const layerHeaders = (layer, isCollapsed) => {
    let headers = []

    // if layer has table columns keyword, indicating which columns need to be shown (only if layer is collapsed)
    if (layer.table && isCollapsed) {
        // just use it
        headers.push(...layer.table)
    } else {
        // Use first object to get properties keys
        if (isCollapsed) {
            headers.push(...Object.keys(layer[featureType(isCollapsed)][0].properties))
        } else {
            headers.push(...Object.keys(layer[featureType(isCollapsed)].pages[0][0].properties))
        }
    }

    // replace _ for spaces
    headers = headers.map(header => header.replace(/_/g, ' '))

    // slice array if needed
    if (isCollapsed) {
        headers = headers.slice(0, COLLAPSED_COLUMNS_COUNT)
    }

    return headers
}

/**
 * Returns an array of features values to be used as table row
 * @param {Object} feature A returned object from GeoServer.
 * @param {Object} feature.properties - An object with keys/values of this feature on GeoServer.
 * @param {Array} headers The headers array to match with feature values
 * @param {string} headers[] A column header, either from layer.table or from layer.features[0].properties
 * @return {Array<String>} An array with feature data strings
 */
const featureData = ((feature, headers) => {

    // keys_are_written_with_underscores
    let keys = headers.map(header => header.replace(/ /g, '_'))
    let values = []

    // for each key, find it's respective value
    keys.map(key => {
        values.push(feature.properties[key])
    })

    return values
})

/**
 * Test if string is an URL
 * @param {Object} text The text to be tested
 * @return {boolean} - if the string is an URL or not
 */
const isURL = text => {
    if (!text) {
        return false
    }
    return text.toString().substr(0,7) === 'http://' || text.toString().substr(0,8) === 'https://'
}

/**
 * Test if string is an URL that doesn't start with 'http://'
 * @param {Object} text The text to be tested
 * @return {boolean} - if the string is a broken URL or not
*/
const isBrokenURL = text => {
    if (!text) {
        return false
    }
    return text.toString().substr(0,4) === 'www.'
}

/**
 * Parse text to be shown on cell
 * @param {Object} text The text to be shown on cell
 * @return {string} - JSX string with the cell code
 */
const parseContent = text => {
    if (isURL(text)) {
        return (<a href={text} target="_blank">Link</a>)
    } else if (isBrokenURL(text)) {
        return (<a href={'http://' + text} target="_blank">Link</a>)
    }
    return text
}

const renderHeader = ({headers}) => {
    return <thead>
        <tr>
            {
                headers.map((property, index) => {
                    return <th className="data-table--header" key={index}>{property}</th>
                })
            }
        </tr>
    </thead>
}

const renderBody = ({layer, isCollapsed, headers}) => {
    let pageToRender

    if (isCollapsed) {
        pageToRender = layer[featureType(isCollapsed)]
    } else {
        pageToRender = layer[featureType(isCollapsed)].pages[layer.modal.currentPage]
    }

    return (
        <tbody>
        {
            pageToRender.map((feature, indexFeature) => {
                return <tr className="data-table--row" key={indexFeature}>
                    {
                        featureData(feature, headers).map((property, indexProperty) => {
                            return <td className="data-table--body" key={indexProperty}>{parseContent(property)}</td>
                        })
                    }
                </tr>
            })
        }
        </tbody>
    )
}

const validPages = (currentPage, totalPages) => {
    let arr = []

    if (currentPage - 2 >= 0) {
        arr.push(currentPage - 2)
    }

    if (currentPage - 1 >= 0) {
        arr.push(currentPage - 1)
    }

    arr.push(currentPage)

    if (currentPage +1 < totalPages) {
        arr.push(currentPage + 1)
    }

    if (currentPage + 2 < totalPages) {
        arr.push(currentPage + 2)
    }

    return arr
}

const renderPagination = ({layer, isCollapsed, handlePaginate}) => {
    if (isCollapsed) {
        return null
    }

    let page = layer.modal.currentPage
    let totalPages = layer.modal.pages.length
    let totalItems = layer.modal.totalItemsCount
    let pageFirstItemNumber = page * 5 + 1
    let pageLastItemNumber = (page + 1) * 5

    if (pageLastItemNumber > totalItems) {
        pageLastItemNumber = totalItems
    }

    return (
        <div className="modal-pagination-container">
            <ul className="modal-pagination">
                <li className="modal-pagination--item">
                    <button className="modal-pagination--link" onClick={() => handlePaginate(layer,page-1)} disabled={page === 0}>
                        <span className="fa fa-chevron-left"></span>
                    </button>
                </li>
                {
                    validPages(page, totalPages).map((n, index) => {
                        let className = "modal-pagination--link"
                        if (page === n) {
                            className += ' active'
                        }
                        return (
                            <li key={index} className="modal-pagination--item">
                                <button className={className} onClick={() => handlePaginate(layer,n)} disabled={n === page}>{n+1}</button>
                            </li>
                        )
                    })
                }
                <li className="modal-pagination--item">
                    <button className="modal-pagination--link" onClick={() => handlePaginate(layer,page+1)} disabled={page === totalPages-1}>
                        <span className="fa fa-chevron-right"></span>
                    </button>
                </li>
            </ul>
            <span className="modal-pagination--counter">
                Exibindo itens {pageFirstItemNumber} a {pageLastItemNumber} de {totalItems}
            </span>
        </div>
    )
}

/**
 * Renders element
 * @param {Object} param Parameter object being destructured
 * @param {Object} param.layer - Layer data.
 * @param {Array} [param.layer.table] - An array of strings specifying columns to be shown on the table. It can be undefined or not set.
 * @param {string} [param.layer.table[]] - A column name.
 * @param {Array} param.layer.features - Array of returned objects. By default only three objects are loaded when DataTable is used within SidebarRight.
 * @param {Object} param.layer.features[] - A returned object from GeoServer.
 * @param {Object} param.layer.features[].properties - An object with keys/values of this feature on GeoServer.
 * @param {boolean} param.isCollapsed - If the table is collapsed (within right sidebar) or expanded (within modal)
 * @return {string} - JSX string with the component code
 */
const DataTable = ({layer, isCollapsed, handlePaginate}) => {

    let headers = layerHeaders(layer, isCollapsed)

    if (!layer[featureType(isCollapsed)]) {
        return null
    }
    return (
        <div>
            <div className="data-table-container">
                <table className="data-table">
                    {
                        renderHeader({headers})
                    }
                    {
                        renderBody({layer, isCollapsed, headers})
                    }
                </table>
            </div>
            { renderPagination({layer, isCollapsed, handlePaginate}) }
        </div>
    )
}

export default DataTable
