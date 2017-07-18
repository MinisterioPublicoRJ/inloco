import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { closeModal, getModalData } from '../../actions/actions.js'
import GeoAPI from '../Api/GeoAPI.js'

const MAX_ITEMS_TO_LOAD = 9999

const mapDispatchToProps = (dispatch) => {
    const onAjaxDataFetched = (layerData) => {
        dispatch(getModalData(layerData))
    }
    return {
        onCloseModal: () => {
            dispatch(closeModal())
        },

        onGetModalData: (layer, lastClickData) => {
            let url = GeoAPI.createUrl({
                layerName: layer.layerName,
                clickData: lastClickData,
                featureCount: MAX_ITEMS_TO_LOAD
            })
            GeoAPI.getLayerData(onAjaxDataFetched, url)
        },
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        layers: state.layers,
        lastClickData: state.lastClickData,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
