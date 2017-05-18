import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

const Menu = ({menuItems, layers, onLayerClick, onMenuClick}) => {
    return (
        <ul className="menu">
            {
                menuItems.map((item) => <MenuItem item={item} layers={layers} onLayerClick={onLayerClick} onMenuClick={onMenuClick} onItemClick={Number.isInteger(item) ? onLayerClick : onMenuClick} key={Number.isInteger(item) ? item : item.idMenu} />)
            }
        </ul>
    );
}

export default Menu;
