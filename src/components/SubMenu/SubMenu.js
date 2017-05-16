import React from 'react';
import SubMenuItem from '../SubMenuItem/SubMenuItem';

require('./submenu.scss');

const SubMenu = ({items, layers}) => {
    return (
        <ul className="submenu">
            {
                items.map((item) => <SubMenuItem item={item} layers={layers} key={item}/>)
            }
        </ul>
    );
}

export default SubMenu;
