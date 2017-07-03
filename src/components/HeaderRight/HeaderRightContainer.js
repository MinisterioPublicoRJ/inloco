import React from 'react'
import HeaderRight from './HeaderRight'
import { connect } from 'react-redux'
import { showSidebarRight } from '../../actions/actions.js'

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: () => {
            dispatch(showSidebarRight())
        }
    }
}

const HeaderRightContainer = connect(
    null,
    mapDispatchToProps
)(HeaderRight)

export default HeaderRightContainer
