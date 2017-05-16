import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

require('./menu.scss');

const Menu = ({menu, layers}) => {
    return (
        <ul className="menu">
            {
                menu.map((item) => <MenuItem item={item} layers={layers} key={Number.isInteger(item) ? item : item.idMenu} />)
            }
        </ul>
    );
}

export default Menu;
