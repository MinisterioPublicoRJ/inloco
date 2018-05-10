import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import {
    addPlaceLayer,
    addTutelaLayer,
    changeActiveBaseMap,
    changeActiveToolbar,
    changeContour,
    changeGlobalFilterType,
    changeOpacity,
    clearPlaceTutelaLayer,
    searchPlaces,
    searchTutela,
    togglePlace,
    toggleTutela,
    activateDownloadLoader,
    deactivateDownloadLoader,
} from '../../actions/ToolbarActions'

const mapStateToProps = (state, ownProps) => {
    return {
        baseMaps: state.baseMaps,
        globalFilterType: state.globalFilterType,
        layers: state.layers,
        loginStatus: state.loginStatus,
        mapProperties: state.mapProperties,
        places: state.places,
        showSidebarRight: state.showSidebarRight,
        toolbarActive: state.toolbarActive,
        tutela: state.tutela,
        ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeActiveBaseMap: baseMap => {
            dispatch(changeActiveBaseMap(baseMap))
        },
        onClearPlaceTutelaLayer: () => {
            dispatch(clearPlaceTutelaLayer())
        },
        onContourChange: item => {
            dispatch(changeContour(item))
        },
        onGlobalFilterTypeChange: item => {
            dispatch(changeGlobalFilterType(item))
        },
        onKeyUpSearchPlaces: item => {
            dispatch(searchPlaces(item))
        },
        onKeyUpSearchTutela: item => {
            dispatch(searchTutela(item))
        },
        onOpacityChange: item => {
            dispatch(changeOpacity(item))
        },
        onPlaceClick: item => {
            dispatch(togglePlace(item))
            dispatch(addPlaceLayer(item))
        },
        onToolbarItemClick: item => {
            // wait a little bit for search component open
            window.setTimeout(() => {
                document.getElementById('searchField').focus()
            }, 100)
            dispatch(changeActiveToolbar(item))
        },
        onTutelaClick: item => {
            dispatch(toggleTutela(item))
            dispatch(addTutelaLayer(item))
        },
        onDownloadClick: () => {
            dispatch(activateDownloadLoader())
        },
        onDownloadEnd: () => {
            dispatch(deactivateDownloadLoader())
        }
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
