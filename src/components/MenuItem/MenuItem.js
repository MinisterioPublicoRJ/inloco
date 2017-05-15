import React from 'react';
import Menu from '../Menu/Menu';
import SubMenu from '../SubMenu/SubMenu';

const MenuItem = ({item, camadas}) => {
    console.log("item", item)
    console.log("camadas", camadas);
    // debugger;
    return (
        <li>
            { item.title ? item.title : camadas[item].title }
            { item.camadas ? <SubMenu items={item.camadas} camadas={camadas} /> : '' }
        </li>
    );
}

export default MenuItem;
