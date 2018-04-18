import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import {
    changeActiveTab,
    closeModal,
    getModalData,
    layerFilterLoaded,
    layerFilterLoading,
    loginUser,
    paginate,
    populateApp,
} from '../../actions/actions.js'
import GeoAPI from '../Api/GeoAPI.js'
import ScaAPI from '../Api/ScaAPI.js'

const mapStateToProps = state => {
    return {
        lastClickData: state.lastClickData,
        layerFilter: state.layerFilter,
        layers: state.layers,
        loginStatus: state.loginStatus,
        loginError: state.loginError,
        newsModal: state.newsModal,
        showAbout: state.showAbout,
        showLayerFilterModal: state.showLayerFilterModal,
        showLogin: state.showLogin,
        showModal: state.showModal,
    }
}

const mapDispatchToProps = dispatch => {
    const onAjaxDataFetched = layerData => {
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

    const populateCallback = xmlData => {
        dispatch(populateApp(xmlData, location.hash))
    }

    const loginCallback = data => {
        dispatch(loginUser(data))
        GeoAPI.getContent(populateCallback)
    }

    const authenticate = ({username, password}) => {
        ScaAPI.logInUser(loginCallback, username, password)
    }

    const authenticateLogout = () => {
        ScaAPI.logOutUser(loginCallback)
    }

    const onLayerFilterSearchLoaded = data => {
        dispatch(layerFilterLoaded(data))
    }

    return {
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
        onCloseModal: () => {
            dispatch(closeModal())
        },
        onLayerFilterSearch: (layer, parameterKey, parameterValue) => {
            dispatch(layerFilterLoading(layer.name, parameterKey, parameterValue))
            GeoAPI.getLayerFilteredData(layer.name, parameterKey, parameterValue, onLayerFilterSearchLoaded)
        },
        onLoginClick: data => {
            authenticate(data)
        },
        onPaginate: (layer, page) => {
            dispatch(paginate(layer, page))
        },
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
