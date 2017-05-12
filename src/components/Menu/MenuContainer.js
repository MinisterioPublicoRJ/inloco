import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        menu: Array.isArray(state.menu) ? state.menu : []
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
