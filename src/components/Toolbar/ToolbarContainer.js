import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import { changeActiveToolbar, togglePlace, addPlaceLayer, changeOpacity, changeContour } from '../../actions/actions.js'


const mapStateToProps = (state, ownProps) => {
    return {
        showSidebarRight: state.showSidebarRight,
        toolbarActive: state.toolbarActive,
        layers: state.layers,
        places: state.places,
        ownProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToolbarItemClick: (item) => {
            dispatch(changeActiveToolbar(item))
        },
        onPlaceClick: (item) => {
            console.log(item)
            dispatch(togglePlace(item))
            dispatch(addPlaceLayer(item))
        },
        onOpacityChange: (item) => {
            dispatch(changeOpacity(item))
        },
        onContourChange: (item) => {
            dispatch(changeContour(item))
        },
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
