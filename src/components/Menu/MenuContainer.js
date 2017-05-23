import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';

const getVisibleMenuElements = (menuItems) => {
    let hasOneVisibleMenuItem = false;
    for(let menuItem of menuItems){
        if(menuItem.selected){
            hasOneVisibleMenuItem = true;
        }
    }

    if(!hasOneVisibleMenuItem){
        return menuItems;
    }
    console.log("menus", menuItems.filter(menuItem => menuItem.selected));

    return menuItems.filter(menuItem => menuItem.selected);
};

const getVisibleLayers = (layers) => {
    let hasOneVisibleLayer = false;
    for(let layer of layers){
        if(layer.match){
            hasOneVisibleLayer = true;
        }
    }

    if(!hasOneVisibleLayer){
        return layers;
    }

    let log = layers.filter(layer => layer.match);

    return layers.filter(layer => layer.match);
};

const mapStateToProps = (state) => {
    return {
        //menuItems: Array.isArray(state.menuItems) ? state.menuItems : [],
        menuItems: Array.isArray(state.menuItems) ? state.menuItems : [],
        layers: Array.isArray(state.layers) ? state.layers : [],
        currentLevel: state.currentLevel
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
        onMenuItemClick: (item) => {
            dispatch({
                type: 'TOGGLE_MENU',
                id: item.id,
                selected: item.selected
            })
        },
        onUntoggleAllClick: () => {
            dispatch({
                type: 'UNTOGGLE_MENUS'
            })
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer;
