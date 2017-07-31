import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import { changeActiveToolbar } from '../../actions/actions.js'


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
            dispatch(changeActiveToolbar(item))
        },
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
