import React from 'react'
import LeafletMap from './LeafletMap'
import { connect } from 'react-redux'

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
    return {}
};

const LeafletMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeafletMap)

export default LeafletMapContainer
