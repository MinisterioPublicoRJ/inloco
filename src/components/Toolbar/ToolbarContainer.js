import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import { openActiveToolbar, closeActiveToolbar } from '../../actions/actions.js'


const mapStateToProps = (state, ownProps) => {
    return {
        showSidebarRight: state.showSidebarRight,
        toolbarActive: state.toolbarActive,
        ownProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToolbarItemClick: (item) => {
            dispatch(openActiveToolbar(item))
        },
        onToolbarMenuClose: () => {
            dispatch(closeActiveToolbar())
        },
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
