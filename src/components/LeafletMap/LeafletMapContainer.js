import React from 'react'
import LeafletMap from './LeafletMap'
import { connect } from 'react-redux'
import GeoAPI from '../Api/GeoAPI.js'
import { populateStateWithLayerData } from '../../actions/actions.js'

const selectedLayers = (layers) => {
    if (!Array.isArray(layers)) {
        return []
    }
    return layers.filter(layer => layer.selected)
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapProperties: state.mapProperties,
        showMenu: state.showMenu,
        showSidebarRight: state.showSidebarRight,
        layers: selectedLayers(state.layers),
        orderByLayerOrder: ownProps.orderByLayerOrder,
    }
}

const mapDispatchToProps = (dispatch) => {
    const onUpdateWithSelectedLayerData = (layerData) => {
        dispatch(populateStateWithLayerData(layerData))
    }
    return {
        /**
         * Create URL to get layers data and populate data table
         * @param e - Event bubbled on map clik
         * @param layers - Active Layers array
         */
        //
        handleMapClick: (e, layers) => {
            const map = e.target
            const BBOX = map.getBounds().toBBoxString()
            const WIDTH = map.getSize().x
            const HEIGHT = map.getSize().y
            const X = map.layerPointToContainerPoint(e.layerPoint).x
            const Y = map.layerPointToContainerPoint(e.layerPoint).y
            layers.map(e => {
                let url = `?LAYERS=${e.layerName}&QUERY_LAYERS=${e.layerName}&STYLES=,&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=${BBOX}&FEATURE_COUNT=3&HEIGHT=${HEIGHT}&WIDTH=${WIDTH}&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A4326&X=${X}&Y=${Y}&CQL_FILTER=1%3D1%3B1%3D1`
                GeoAPI.getLayerData(onUpdateWithSelectedLayerData,url)
            })
        },
    }
}

const LeafletMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeafletMap)

export default LeafletMapContainer
