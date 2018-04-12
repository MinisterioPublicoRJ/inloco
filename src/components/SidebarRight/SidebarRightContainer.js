import React from 'react'
import { connect } from 'react-redux'
import SidebarRight from './SidebarRight'
import { toggleLayerInformation, slideLayerUp, slideLayerDown, dropLayer, hideSidebarRight, toggleLayer, removeAllLayers, openModal, getModalData, onIconMouseOver, onIconMouseOut, onLoadingParams, onLoadParams, openLayerFilterModal } from '../../actions/actions.js'
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
            layer: layer,
            clickData: lastClickData,
            featureCount: MAX_ITEMS_TO_LOAD
        })
        GeoAPI.getLayerData(onAjaxDataFetched, url)
    }

    return {
        onLayerClick: item => {
            dispatch(toggleLayerInformation(item))
        },
        onLayerUp: item => {
            dispatch(slideLayerUp(item))
        },
        onLayerDown: item => {
            dispatch(slideLayerDown(item))
        },
        onLayerDrop: (dragged, target) => {
            dispatch(dropLayer(dragged, target))
        },
        onSidebarRightHideClick: () => {
            dispatch(hideSidebarRight())
        },
        onLayerRemove: item => {
            dispatch(toggleLayer(item))
        },
        onRemoveAllLayers: item => {
            dispatch(removeAllLayers())
        },
        onOpenLayerFilterModal: item => {
            dispatch(openLayerFilterModal(item))
        },
        onOpenModal: (item, lastClickData) => {
            dispatch(openModal(item))
            var selectedLayer = item
            onGetModalData(selectedLayer, lastClickData)
        },
        onIconMouseOver: (e, layer) => {
            dispatch(onIconMouseOver(layer))
        },
        onIconMouseOut: layer => {
            dispatch(onIconMouseOut(layer))
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
                dispatch(onLoadParams(layer, params))
            })
        }
    }
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer
