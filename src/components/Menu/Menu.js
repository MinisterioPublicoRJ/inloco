import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

require('./menu.scss');

const Menu = ({menu, layers}) => {
    return (
        <ul className="menu">
            {
                menu.map((item) => <MenuItem item={item} layers={layers} key={item.idMenu} />)
            }
        </ul>
    );
}

export default Menu;
