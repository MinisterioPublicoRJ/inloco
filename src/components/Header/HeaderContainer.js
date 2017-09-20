import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { showMenuLayer } from '../../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        showTooltipMenu: state.showTooltipMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: () => {
            dispatch(showMenuLayer())
        }
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)

export default HeaderContainer
