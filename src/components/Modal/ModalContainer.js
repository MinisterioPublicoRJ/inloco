import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { closeModal, getModalData, changeActiveTab, paginate, loginUser } from '../../actions/actions.js'
import GeoAPI from '../Api/GeoAPI.js'
import ScaAPI from '../Api/ScaAPI.js'

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        layers: state.layers,
        lastClickData: state.lastClickData,
        newsModal: state.newsModal,
        showAbout: state.showAbout,
        showLogin: state.showLogin,
    }
}

const mapDispatchToProps = (dispatch) => {
    const onAjaxDataFetched = (layerData) => {
        dispatch(getModalData(layerData))
    }

    const onGetModalData = (layer, lastClickData) => {
        const MAX_ITEMS_TO_LOAD = 9999

        let url = GeoAPI.createUrl({
            layer: layer,
            clickData: lastClickData,
            featureCount: MAX_ITEMS_TO_LOAD
        })
        GeoAPI.getLayerData(onAjaxDataFetched, url)
    }

    const loginCallback = (data) => {
        dispatch(loginUser(data))
    }

    const authenticate = ({username, password}) => {
        ScaAPI.logInUser(loginCallback, username, password)
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
        onLoginClick: (data) => {
            authenticate(data)
        },
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
