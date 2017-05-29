import React from 'react';
import MenuHeader from '../MenuHeader/MenuHeader.js';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';

const SidebarLeft = ({searchLayer, showMenu, hideMenu}) => {
    var cssClass = 'sidebar-left ';
    console.log(showMenu);
    if (!showMenu) {
        cssClass += 'hide-sidebar'
    }
    return (
        <div className={cssClass}>
            <MenuHeader hideMenu={hideMenu}/>
            <MenuContainer/>
            <SearchLayer searchLayer={searchLayer}/>
        </div>
    );
};

export default SidebarLeft;
