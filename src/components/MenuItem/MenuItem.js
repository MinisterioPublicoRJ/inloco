import React from 'react';
import Menu from '../Menu/Menu';

const MenuItem = ({item, layers, onItemClick, onMenuItemClick, onLayerClick, parentMenuTitle}) => {
    return (
        <div>
            <li onClick={() => onItemClick(item.id ? item.id : layers[item].id)}>
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
                />
                : ''
            }
        </div>
    );
}

export default MenuItem;
