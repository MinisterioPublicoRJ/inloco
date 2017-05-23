import React from 'react';
import Menu from './Menu';

const MenuItem = ({item, layers, onItemClick, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel}) => {
    let visibleClass = '';
    let menuItemClassName = item.selected ? 'selected' : ''
    let itemTitle = "";
    if(item.title) {
        itemTitle = item.title;
        if(!item.match){
            visibleClass = 'hidden';
        }
    } else {
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

export default MenuItem;
