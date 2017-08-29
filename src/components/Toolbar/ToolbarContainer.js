import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import {
    changeActiveToolbar,
    togglePlace,
    addPlaceLayer,
    changeOpacity,
    changeContour,
    searchPlaces,
    changeActiveBaseMap,
} from '../../actions/actions.js'


const mapStateToProps = (state, ownProps) => {
    return {
        mapProperties: state.mapProperties,
        showSidebarRight: state.showSidebarRight,
        toolbarActive: state.toolbarActive,
        layers: state.layers,
        places: state.places,
        baseMaps: state.baseMaps,
        ownProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToolbarItemClick: (item) => {
            dispatch(changeActiveToolbar(item))
        },
        onPlaceClick: (item) => {
            dispatch(togglePlace(item))
            dispatch(addPlaceLayer(item))
        },
        onOpacityChange: (item) => {
            dispatch(changeOpacity(item))
        },
        onContourChange: (item) => {
            dispatch(changeContour(item))
        },
        onKeyUpSearch: (item) => {
            dispatch(searchPlaces(item))
        },
        onChangeActiveBaseMap: (baseMap) => {
            dispatch(changeActiveBaseMap(baseMap))
        },
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
