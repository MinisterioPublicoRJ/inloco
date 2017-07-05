import React from 'react'
import HeaderRight from './HeaderRight'
import { connect } from 'react-redux'
import { showSidebarRight } from '../../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        layers: state.layers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: () => {
            dispatch(showSidebarRight())
        }
    }
}

const HeaderRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderRight)

export default HeaderRightContainer
