import React from 'react';
import Menu from '../Menu/Menu';

const MenuItem = ({item, layers, onItemClick, onMenuClick, onLayerClick}) => {
    return (
        <div>
            <li onClick={() => onItemClick(item.id ? item.id : layers[item].id)}>
                { item.title ? item.title : layers[item].title }
            </li>
            { item.layers ? <Menu menuItems={item.layers} layers={layers} key={item.idMenu} onMenuClick={onMenuClick} onLayerClick={onLayerClick}/> : '' }
        </div>
    );
}

export default MenuItem;
