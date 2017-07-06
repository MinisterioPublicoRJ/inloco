import React from 'react'
import Tooltip from './Tooltip'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        tooltip: state.tooltip,
        scrollTop: state.scrollTop,
    }
}

const TooltipContainer = connect(
    mapStateToProps,
    null
)(Tooltip)

export default TooltipContainer
