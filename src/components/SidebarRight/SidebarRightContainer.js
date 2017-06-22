import React from 'react';
import SidebarRight from './SidebarRight';
import { connect } from 'react-redux';

const selectedLayers = (layers) => {
    if (!Array.isArray(layers)) {
        return []
    }
    return layers.filter(layer => layer.selected)
}

const mapStateToProps = (state) => {
    return {
        layers: selectedLayers(state.layers),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer
