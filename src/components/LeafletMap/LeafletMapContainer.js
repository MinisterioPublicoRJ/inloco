import React from 'react'
import LeafletMap from './LeafletMap'
import { connect } from 'react-redux'
import GeoAPI from '../Api/GeoAPI.js'
import { populateStateWithLayerData, updateLastClickData, updateBasemapLoadingStatus, lastMapPosition } from '../../actions/actions.js'

const MAX_ITEMS_TO_LOAD = 3

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
        showDrawControls: state.showDrawControls,
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
            const clickData = {
                BBOX: map.getBounds().toBBoxString(),
                WIDTH: map.getSize().x,
                HEIGHT: map.getSize().y,
                X: map.layerPointToContainerPoint(e.layerPoint).x,
                Y: map.layerPointToContainerPoint(e.layerPoint).y
            }
            dispatch(updateLastClickData(clickData))
            layers.map(l => {
                let url = GeoAPI.createUrl({
                    layerName: l.layerName,
                    clickData,
                    featureCount: MAX_ITEMS_TO_LOAD,
                })

                GeoAPI.getLayerData(onUpdateWithSelectedLayerData, url)
            })
        },
        onUpdateBasemapLoadingStatus: () => {
            dispatch(updateBasemapLoadingStatus())
        },
        handleMapMove: e => {
            const map = e.target
            const mapCenter = map.getCenter()
            const mapZoom = map.getZoom()
            const mapData = {
                lat: mapCenter.lat,
                lng: mapCenter.lng,
                zoom: mapZoom,
            }
            dispatch(lastMapPosition(mapData))
        },
    }
}

const LeafletMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeafletMap)

export default LeafletMapContainer
