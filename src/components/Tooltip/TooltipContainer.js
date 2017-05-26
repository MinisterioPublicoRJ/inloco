import React from 'react';
import Tooltip from './Tooltip';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        searchLayer: (text) => {
            dispatch({
                type: 'SEARCH_LAYER',
                text
            })
        }
    };
};

const TooltipContainer = connect(
    null,
    mapDispatchToProps
)(Tooltip)

export default TooltipContainer;
