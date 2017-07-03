import React from 'react'
import HeaderRight from './Header'
import { connect } from 'react-redux'
import { showSidebarRight } from '../../actions/actions.js'

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: () => {
            dispatch(showSidebarRight())
        }
    }
}

const HeaderContainer = connect(
    null,
    mapDispatchToProps
)(Header)

export default HeaderRightContainer
