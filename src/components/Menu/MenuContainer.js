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

    return menuItems.filter(menuItem => menuItem.selected);
};

const mapStateToProps = (state) => {
    return {
        //menuItems: Array.isArray(state.menuItems) ? state.menuItems : [],
        menuItems: Array.isArray(state.menuItems) ? getVisibleMenuElements(state.menuItems) : [],
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
        },
        onMouseOver: (layer) => {
            if(layer){
                dispatch({
                    type: 'SHOW_DESCRIPTION'
                })
            }
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer;
