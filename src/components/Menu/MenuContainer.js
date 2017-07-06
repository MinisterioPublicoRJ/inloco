import React from 'react'
import Menu from './Menu'
import { connect } from 'react-redux'
import { toggleLayer, toggleMenu, untoggleAll, showDescription, hideDescription } from '../../actions/actions.js'

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
        sidebarLeftWidth: ownProps.sidebarLeftWidth,
        sidebarLeftHeight: ownProps.sidebarLeftHeight,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLayerClick: (item) => {
            dispatch(toggleLayer(item))
        },
        onMenuItemClick: (item) => {
            // scroll to top
            document.getElementsByClassName('sidebar-left')[0].childNodes[1].scrollTop = 0

            dispatch(toggleMenu(item))
        },
        onUntoggleAllClick: () => {
            dispatch(untoggleAll())
        },
        onMouseOver: (layer,
            sidebarLeftWidth,
            parentHeight,
            top
        ) => {
            if(layer){
                dispatch(showDescription(
                    layer,
                    sidebarLeftWidth,
                    parentHeight,
                    top
                ))
            }
        },
        onMouseOut: (layer) => {
            if(layer){
                dispatch(hideDescription(layer))
            }
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer
