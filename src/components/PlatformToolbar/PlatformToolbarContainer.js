import React from 'react'
import PlatformToolbar from './PlatformToolbar'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        showSidebarRight: state.showSidebarRight,
    }
}

const PlatformToolbarContainer = connect(
    mapStateToProps,
    null
)(PlatformToolbar)

export default PlatformToolbarContainer
