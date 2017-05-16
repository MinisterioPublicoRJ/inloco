import React from 'react';
import Menu from '../Menu/Menu';

const MenuItem = ({item, layers}) => {
    return (
        <li>
            { item.title ? item.title : layers[item].title }
            { item.layers ? <Menu menu={item.layers} layers={layers} /> : '' }
        </li>
    );
}

export default MenuItem;
