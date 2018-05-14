import React from 'react'
import { connect } from 'react-redux'
import SidebarRight from './SidebarRight'
import GeoAPI from '../Api/GeoAPI.js'
import {
    clearLayerFilter,
    dropLayer,
    getModalData,
    hideSidebarRight,
    layerFilterLoading,
    layerFilterLoaded,
    onIconMouseOut,
    onIconMouseOver,
    onLoadingParams,
    onLoadParams,
    openLayerFilterModal,
    openModal,
    removeAllLayers,
    slideLayerDown,
    slideLayerUp,
    toggleLayer,
    toggleLayerInformation
} from '../../actions/actions.js'

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
            layer: layer,
            clickData: lastClickData,
            featureCount: MAX_ITEMS_TO_LOAD
        })
        GeoAPI.getLayerData(onAjaxDataFetched, url)
    }

    const onLayerFilterSearchLoaded = data => {
        dispatch(layerFilterLoaded(data))
    }

    return {
        onClearLayerFilter: item => {
            dispatch(clearLayerFilter(item))
        },
        onIconMouseOut: layer => {
            dispatch(onIconMouseOut(layer))
        },
        onIconMouseOver: (e, layer) => {
            dispatch(onIconMouseOver(layer))
        },
        onLayerClick: item => {
            dispatch(toggleLayerInformation(item))
        },
        onLayerDown: item => {
            dispatch(slideLayerDown(item))
        },
        onLayerDrop: (dragged, target) => {
            dispatch(dropLayer(dragged, target))
        },
        onLayerFilterSearch: (layerName, parameterKey, parameterValue) => {
            dispatch(layerFilterLoading(layerName, parameterKey, parameterValue))
            GeoAPI.getLayerFilteredData(layerName, parameterKey, parameterValue, onLayerFilterSearchLoaded)
        },
        onLayerRemove: item => {
            dispatch(toggleLayer(item))
        },
        onLayerUp: item => {
            dispatch(slideLayerUp(item))
        },
        onLoadParams: layer => {
            dispatch(onLoadingParams(layer))
            GeoAPI.getLayerParams(layer, data => {
                let xmlDoc
                if (window.DOMParser) {
                    let parser = new DOMParser()
                    xmlDoc = parser.parseFromString(data, 'text/xml')
                } else {
                    // Internet Explorer
                    xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
                    xmlDoc.async = 'false'
                    xmlDoc.loadXML(data)
                }
                let params = Array.from(
                    xmlDoc.getElementsByTagName('xsd:element')
                ).map(
                    el => el.getAttribute('name')
                )
                params.pop() // remove last one (xsd element of the layer itself)
                dispatch(onLoadParams(layer, params))
            })
        },
        onOpenLayerFilterModal: item => {
            dispatch(openLayerFilterModal(item))
        },
        onOpenModal: (item, lastClickData) => {
            dispatch(openModal(item))
            var selectedLayer = item
            onGetModalData(selectedLayer, lastClickData)
        },
        onRemoveAllLayers: item => {
            dispatch(removeAllLayers())
        },
        onSidebarRightHideClick: () => {
            dispatch(hideSidebarRight())
        },
    }
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer
