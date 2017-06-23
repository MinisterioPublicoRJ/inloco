import React from 'react';
import LayerStylesCarousel from './LayerStylesCarousel';
import { connect } from 'react-redux';
import { slideLeftStyles, slideRightStyles } from '../../actions/actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        layer: ownProps.layer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onArrowLeftClick: (item) => {
            dispatch(slideLeftStyles(item));
        },
        onArrowRightClick: (item) => {
            dispatch(slideRightStyles(item));
        },
    }
}

const LayerStylesCarouselContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerStylesCarousel)

export default LayerStylesCarouselContainer
