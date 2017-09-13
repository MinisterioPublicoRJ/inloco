import React from 'react'
import SidebarRight from './SidebarRight'
import { connect } from 'react-redux'
import { toggleLayerInformation, slideLayerUp, slideLayerDown, dropLayer, hideSidebarRight, toggleLayer, removeAllLayers, openModal, getModalData } from '../../actions/actions.js'
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
        polygonData: state.polygonData,
    }
}

const mapDispatchToProps = (dispatch) => {
    const onAjaxDataFetched = (layerData) => {
        dispatch(getModalData(layerData))
    }
    /**
     * Fetch data from server to get content
     * of the clicked layer
     */
    const onGetModalData = (layer, lastClickData) => {
        const MAX_ITEMS_TO_LOAD = 9999

        let url = GeoAPI.createUrl({
            layerName: layer.layerName,
            clickData: lastClickData,
            featureCount: MAX_ITEMS_TO_LOAD
        })
        GeoAPI.getLayerData(onAjaxDataFetched, url)
    }

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
        onOpenModal: (item, lastClickData) => {
            dispatch(openModal(item))
            var selectedLayer = item
            //if (!layer.modal.pages) {
                // Call AJAX
                onGetModalData(selectedLayer, lastClickData)
            //}
        },
    }
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer
