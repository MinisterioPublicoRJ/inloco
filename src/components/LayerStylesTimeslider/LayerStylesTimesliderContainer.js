import React from 'react'
import { connect } from 'react-redux'
import LayerStylesTimeslider from './LayerStylesTimeslider.js'

const mapStateToProps = (state, ownProps) => {
    return {
        layer: ownProps.layer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (item) => {
            console.log(item)
        },
    }
}

const LayerStylesTimesliderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerStylesTimeslider)

export default LayerStylesTimesliderContainer
