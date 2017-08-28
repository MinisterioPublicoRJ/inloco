import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import { changeActiveToolbar, changeActiveBaseMap } from '../../actions/actions.js'


const mapStateToProps = (state, ownProps) => {
    return {
        mapProperties: state.mapProperties,
        showSidebarRight: state.showSidebarRight,
        toolbarActive: state.toolbarActive,
        layers: state.layers,
        baseMaps: state.baseMaps,
        ownProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToolbarItemClick: (item) => {
            dispatch(changeActiveToolbar(item))
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
