import React from 'react';
import SidebarLeft from './SidebarLeft';
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

const SidebarLeftContainer = connect(
    null,
    mapDispatchToProps
)(SidebarLeft)

export default SidebarLeftContainer;
