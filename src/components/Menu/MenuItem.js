import React from 'react'
import Menu from './Menu'

const MenuItem = ({item, layers, onItemClick, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel, allMenuItems}) => {
    // class name if menu item with children or single layer, with no children
    let menuItemClassName = item.title ? 'menu-item-with-children' : 'menu-layer'
    menuItemClassName += item.selected ? ' selected' : ''

    let visibleClass = '';
    let itemTitle = '';

    // check if one menu is selected, hide others
    let otherIsSelected = false;
    if(allMenuItems){
        for(let otherMenuItem of allMenuItems){
            if(otherMenuItem.selected && otherMenuItem.title !== item.title){
                otherIsSelected = true;
            }
        }
        if(otherIsSelected){
            visibleClass = 'hidden';
        }
    }

    // if menu with children, and it doesn't match search, hide it
    if(item.title) {
        itemTitle = item.title;
        if(!item.match){
            visibleClass = 'hidden';
        }
    } else {
        // if it's a layer, check if it's match'ed.
        for (var i = 0 ; i < layers.length ; i++){
            var layer = layers[i];
            if(layer.key === item){
                itemTitle = layer.title;
                if(!layer.match){
                    visibleClass = 'hidden';
                }
            }
        }
    }



    return (
        <div className={visibleClass}>
            <li
                onClick={() => onItemClick(item.id ? item : layers[item])}
                className={menuItemClassName}
            >
                { itemTitle }
            </li>
            {
                item.layers ?
                <Menu
                    menuItems={item.layers}
                    menuTitle={item.title}
                    parentMenuTitle={parentMenuTitle}
                    key={item.idMenu}
                    selected={item.selected}
                    layers={layers}
                    onMenuItemClick={onMenuItemClick}
                    onLayerClick={onLayerClick}
                    currentLevel={currentLevel}
                />
                : ''
            }
        </div>
    );
}

export default MenuItem
