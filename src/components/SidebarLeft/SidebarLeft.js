import React from 'react';
import MenuHeader from '../MenuHeader/MenuHeader.js';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';
import Measure from 'react-measure';

const SidebarLeft = ({searchLayer, showMenu, hideMenu}) => {
    var cssClass = 'sidebar-left allow-transition ';
    console.log(showMenu);
    if (!showMenu) {
        cssClass += 'hide-sidebar';
    }
    return (
        <Measure>
            {({width, height}) =>
                <div className={cssClass}>
                    <MenuHeader hideMenu={hideMenu}/>
                    <MenuContainer sidebarLeftWidth={width} sidebarLeftHeight={height}/>
                    <SearchLayer searchLayer={searchLayer}/>
                </div>
            }
        </Measure>
    );
};

export default SidebarLeft;
