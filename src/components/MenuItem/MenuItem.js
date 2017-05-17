import React from 'react';
import Menu from '../Menu/Menu';

const MenuItem = ({item, layers, onClick}) => {
    return (
        <div>
            <li onClick={onClick ? onClick : () => e.preventDefault()}>
                { item.title ? item.title : layers[item].title }
            </li>
            { item.layers ? <Menu menu={item.layers} layers={layers} key={item.idMenu}/> : '' }
        </div>
    );
}

export default MenuItem;
