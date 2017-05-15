import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        menu: Array.isArray(state.menu) ? state.menu : [],
        camadas: Array.isArray(state.camadas) ? state.camadas : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLayerClick: (id) => {
            dispatch(toggleLayer(id))
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer;
