import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { closeModal, getModalData, changeActiveTab, paginate } from '../../actions/actions.js'
import GeoAPI from '../Api/GeoAPI.js'

const mapDispatchToProps = (dispatch) => {
    const onAjaxDataFetched = (layerData) => {
        dispatch(getModalData(layerData))
    }

    const onGetModalData = (layer, lastClickData) => {
        const MAX_ITEMS_TO_LOAD = 9999

        let url = GeoAPI.createUrl({
            layerName: layer.layerName,
            styleName: layer.styles[layer.selectedLayerStyleId].name.replace('plataforma:', ''),
            clickData: lastClickData,
            featureCount: MAX_ITEMS_TO_LOAD
        })
        GeoAPI.getLayerData(onAjaxDataFetched, url)
    }

    return {
        onCloseModal: () => {
            dispatch(closeModal())
        },
        /**
         * Fetch data from server to get content
         * of the selected tab
         */
        onChangeActiveTab: (layer, lastClickData) => {
            dispatch(changeActiveTab(layer))
            var selectedLayer = layer
            // Call AJAX
            onGetModalData(selectedLayer, lastClickData)
        },

        onPaginate: (layer, page) => {
            dispatch(paginate(layer, page))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        layers: state.layers,
        lastClickData: state.lastClickData,
        newsModal: state.newsModal,
        showAbout: state.showAbout,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
