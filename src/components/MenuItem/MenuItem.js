import React from 'react';
import Menu from '../Menu/Menu';

const MenuItem = ({item, camadas}) => {
    console.log("item", item)
    console.log("camadas", camadas);
    // debugger;
    return (
        <li>
            { item.title ? item.title : camadas[item-1].title }
            { item.camadas ? <Menu menu={item.camadas} camadas={camadas} /> : '' }
        </li>
    );
}

export default MenuItem;
