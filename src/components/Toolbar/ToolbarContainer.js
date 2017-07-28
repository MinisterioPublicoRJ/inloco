import React from 'react'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => {
    return {
        showSidebarRight: state.showSidebarRight,
        ownProps,
    }
}

const ToolbarContainer = connect(
    mapStateToProps,
    null
)(Toolbar)

export default ToolbarContainer
