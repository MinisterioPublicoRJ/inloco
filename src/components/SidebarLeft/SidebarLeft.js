import React from 'react';
import MenuHeader from '../MenuHeader/MenuHeader.js';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';

const SidebarLeft = ({searchLayer}) => {
    return (
        <div className="sidebar-left">
            <MenuHeader/>
            <MenuContainer/>
            <SearchLayer searchLayer={searchLayer}/>
        </div>
    );
};

export default SidebarLeft;
