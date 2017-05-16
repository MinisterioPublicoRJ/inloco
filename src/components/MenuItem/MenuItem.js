import React from 'react';
import Menu from '../Menu/Menu';
import SubMenu from '../SubMenu/SubMenu';

const MenuItem = ({item, layers}) => {
    return (
        <li>
            { item.title ? item.title : layers[item].title }
            { item.layers ? <SubMenu items={item.layers} layers={layers}/> : '' }
        </li>
    );
}

export default MenuItem;
