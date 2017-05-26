import React from 'react'
import Menu from './Menu'
import { connect } from 'react-redux'

const getVisibleMenuElements = (menuItems) => {
    let hasOneVisibleMenuItem = false
    for (let menuItem of menuItems) {
        if (menuItem.selected) {
            hasOneVisibleMenuItem = true
        }
    }

    if (!hasOneVisibleMenuItem) {
        return menuItems
    }

    return menuItems.filter(menuItem => menuItem.selected)
}

const getVisibleLayers = (layers) => {
    let hasOneVisibleLayer = false
    for (let layer of layers) {
        if (layer.match) {
            hasOneVisibleLayer = true
        }
    }

    if (!hasOneVisibleLayer) {
        return layers
    }

    return layers.filter(layer => layer.match)
}

const mapStateToProps = (state, ownProps) => {
    return {
        menuItems: Array.isArray(state.menuItems) ? state.menuItems : [],
        layers: Array.isArray(state.layers) ? state.layers : [],
        currentLevel: state.currentLevel,
        sidebarLeftWidth: ownProps.sidebarLeftWidth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLayerClick: (item) => {
            dispatch({
                type: 'TOGGLE_LAYER',
                id: item.id
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
        onMouseOver: (event, layer, sidebarLeftWidth) => {
            if(layer){
                dispatch({
                    type: 'SHOW_DESCRIPTION',
                    id: layer.id,
                    y: event.clientY,
                    sidebarLeftWidth
                })
            }
        },
        onMouseOut: (layer) => {
            if(layer){
                dispatch({
                    type: 'HIDE_DESCRIPTION',
                    id: layer.id
                })
            }
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer
