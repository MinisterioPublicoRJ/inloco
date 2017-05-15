import React from 'react';
import SubMenuItem from '../SubMenuItem/SubMenuItem';

require('./submenu.scss');

const SubMenu = ({items, camadas}) => {
    console.log("submenu", items, camadas);
    return (
        <ul className="submenu">
            {
                items.map((item) => <SubMenuItem item={item} camadas={camadas} />)
            }
        </ul>
    );
}

export default SubMenu;
