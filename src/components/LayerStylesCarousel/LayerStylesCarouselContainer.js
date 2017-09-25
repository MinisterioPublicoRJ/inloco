import React from 'react'
import LayerStylesCarousel from './LayerStylesCarousel'
import { connect } from 'react-redux'
import { slideLeftStyles, slideRightStyles, selectLayerStyle, showLayerStyleDescription, hideLayerStyleDescription } from '../../actions/actions.js'

const mapStateToProps = (state, ownProps) => {
    return {
        layer: ownProps.layer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onArrowLeftClick: (item) => {
            dispatch(slideLeftStyles(item))
        },
        onArrowRightClick: (item) => {
            dispatch(slideRightStyles(item))
        },
        onStyleClick: (item, styleId) => {
            dispatch(selectLayerStyle(item, styleId))
        },
        onStyleMouseOver: (item, styleId) => {
            dispatch(showLayerStyleDescription(item, styleId))
        },
        onStyleMouseOut: (item, styleId) => {
            dispatch(hideLayerStyleDescription(item, styleId))
        }
    }
}

const LayerStylesCarouselContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerStylesCarousel)

export default LayerStylesCarouselContainer
