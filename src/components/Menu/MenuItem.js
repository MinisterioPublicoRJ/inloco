import React from 'react';
import Menu from './Menu';

const MenuItem = ({item, layers, onItemClick, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel}) => {
    let menuItemClassName = item.selected ? 'selected' : ''
    return (
        <div>
            <li
                onClick={() => onItemClick(item.id ? item : layers[item])}
                className={menuItemClassName}
            >
                { item.title ? item.title : layers[item].title }
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
