import React from 'react'
import SidebarRight from './SidebarRight'
import { connect } from 'react-redux'
import { toggleLayerInformation, slideLayerUp, slideLayerDown, dropLayer, hideSidebarRight, toggleLayer, removeAllLayers, openModal } from '../../actions/actions.js'
import GeoAPI from '../Api/GeoAPI.js'

/**
 * This function filters layers using the selected property
 * @param {Object[]} layers - this is array of layers.
 * @returns {Object[]} - returns all layers that are selected
 */
const selectedLayers = (layers) => {
    if (!Array.isArray(layers)) {
        return []
    }
    return layers.filter(layer => layer.selected)
}

const mapStateToProps = (state, ownProps) => {
    return {
        layers: selectedLayers(state.layers),
        showSidebarRight: state.showSidebarRight,
        orderByLayerOrder: ownProps.orderByLayerOrder,
        lastClickData: state.lastClickData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLayerClick: (item) => {
            dispatch(toggleLayerInformation(item))
        },
        onLayerUp: (item) => {
            dispatch(slideLayerUp(item))
        },
        onLayerDown: (item) => {
            dispatch(slideLayerDown(item))
        },
        onLayerDrop: (dragged, target) => {
            dispatch(dropLayer(dragged, target))
        },
        onSidebarRightHideClick: () => {
            dispatch(hideSidebarRight())
        },
        onLayerRemove: (item) => {
            dispatch(toggleLayer(item))
        },
        onRemoveAllLayers: (item) => {
            dispatch(removeAllLayers())
        },
        onOpenModal: (item) => {
            dispatch(openModal(item))
        },
    }
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer
