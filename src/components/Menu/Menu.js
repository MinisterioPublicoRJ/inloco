import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

require('./menu.scss');

const Menu = ({menu, layers, onLayerClick}) => {
    return (
        <ul className="menu">
            {
                menu.map((item) => <MenuItem item={item} layers={layers} onClick={() => onLayerClick(item.idMenu)} key={Number.isInteger(item) ? item : item.idMenu} />)
            }
        </ul>
    );
}

export default Menu;
