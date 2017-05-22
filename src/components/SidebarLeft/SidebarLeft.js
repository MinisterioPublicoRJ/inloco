import React from 'react';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';

const SidebarLeft = ({searchLayer}) => {
    return (
        <div className="sidebar-left">
            <MenuContainer/>
            <SearchLayer searchLayer={searchLayer}/>
        </div>
    );
};

export default SidebarLeft;
