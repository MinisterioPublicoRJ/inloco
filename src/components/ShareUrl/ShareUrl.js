import React from 'react'
import ClipboardButton from 'react-clipboard.js'

/**
 * Filters layers using the `selected` property
 * @param {Object[]} layers - layers array
 * @returns {Object[]} - returns all layers that are selected
 */
const selectedLayers = (layers) => {
    if (!Array.isArray(layers)) {
        return []
    }
    return layers.filter(layer => layer.selected)
}

/**
 * Truncate coordinate values to given precision, without rounding.
 * For instance, -23.1234567890 => -23.123456 when decimals = 6.
 * Note that it wont create zeroes on the end, so -23.45 => -23.45 when decimals = 6.
 * @param {number} number a number to be truncated
 * @param {number} decimals desired decimals on truncated number
 * @return {string} the truncated number as string.
 */
const truncateValue = (number, decimals) => {
    let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimals || -1) + '})?')
    return number.toString().match(re)[0]
}

/**
 * Creates a share URL with current map view and active layers
 * @param {Object} mapProperties object with map properties
 * @param {Object} mapProperties.currentCoordinates object with the current view lat/lon and zoom level
 * @param {number} mapProperties.currentCoordinates.lat current view latitude
 * @param {number} mapProperties.currentCoordinates.lng current view longitude
 * @param {number} mapProperties.currentCoordinates.zoom current view zoom
 * @param {Object[]} activeLayers array with active layers
 * @return {string} JSX string
 */
const ShareUrl = ({mapProperties, layers, orderByLayerOrder, onToolbarItemClick}) => {
    if (!mapProperties || !mapProperties.currentCoordinates) {
        return null
    }
    let lat = truncateValue(mapProperties.currentCoordinates.lat, 6)
    let lng = truncateValue(mapProperties.currentCoordinates.lng, 6)
    let zoom = mapProperties.currentCoordinates.zoom
    let basemap = mapProperties.currentMap.name

    // drop current value if needed
    let baseUrl = location.href.split('#')[0]

    let url = `${baseUrl}#lat=${lat}&lng=${lng}&zoom=${zoom}&basemap=${basemap}`

    let activeLayers = orderByLayerOrder(selectedLayers(layers)).map(l => l.id).join(',')

    if (activeLayers) {
        url += `&layers=${activeLayers}`
    }

    return (
        <fieldset className="toolbar-inputshare">
            <ClipboardButton data-clipboard-text={url} onClick={()=> onToolbarItemClick('share')}>COPIAR</ClipboardButton>
        </fieldset>
    )
}

export default ShareUrl
