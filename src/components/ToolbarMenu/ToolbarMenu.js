import React from 'react'
import ExportList from '../ExportList/ExportList'
import BaseMapList from '../BaseMapList/BaseMapList'
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
const shareUrl = (mapProperties, activeLayers) => {
    if (!mapProperties || !mapProperties.currentCoordinates) {
        return null
    }
    let lat = truncateValue(mapProperties.currentCoordinates.lat, 6)
    let lng = truncateValue(mapProperties.currentCoordinates.lng, 6)
    let zoom = mapProperties.currentCoordinates.zoom

    // drop current value if needed
    let baseUrl = location.href.split('#')[0]

    let url = `${baseUrl}#lat=${lat}&lng=${lng}&zoom=${zoom}`

    let layers = activeLayers.map(l => l.id).join(',')

    if (layers) {
        url += `&layers=${layers}`
    }

    return (
        <fieldset className="toolbar-inputshare">
            <ClipboardButton data-clipboard-text={url}>COPIAR</ClipboardButton>
        </fieldset>
    )
}

/**
 * Creates a toolbar menu (one for each toolbar item)
 * @param {object} p An object with parameters
 * @return {string} JSX string
 */
const ToolbarMenu = ({ item, active, type, layers, baseMaps, onChangeActiveBaseMap, mapProperties }) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if((!active || active !== item.name) || item.name === "draw" ) {
        className += " hidden"
    }

    return (
        <div className={className}>
            {
                item.name === 'download' ? <ExportList layers={layers}/> : ''
            }
            {
                item.name === 'share' ? shareUrl(mapProperties, selectedLayers(layers)) : ''
            }
            {
                item.name === 'basemaps'
                ? <BaseMapList baseMaps={baseMaps} onChangeActiveBaseMap={onChangeActiveBaseMap} />
                : ''
            }
        </div>
    )
}

export default ToolbarMenu
