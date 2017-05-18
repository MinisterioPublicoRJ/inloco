import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        menuItems: Array.isArray(state.menuItems) ? state.menuItems : [],
        layers: Array.isArray(state.layers) ? state.layers : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLayerClick: (id) => {
            dispatch({
                type: 'TOGGLE_LAYER',
                id
            })
        },
        onMenuClick: (id) => {
            dispatch({
                type: 'TOGGLE_MENU',
                id
            })
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer;
