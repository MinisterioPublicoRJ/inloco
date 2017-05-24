import React from 'react';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';

const SidebarLeft = ({searchLayer}) => {
    return (
        <div className="sidebar-left">
            <img src="/src/assets/img/logo.png" alt="" className="sidebar-left--logo"/>
            <h1 className="sidebar-left--title">
                camadas de exibição
                <small className="sidebar-left--caption">Escolha uma categoria abaixo</small>
            </h1>
            <MenuContainer/>
            <SearchLayer searchLayer={searchLayer}/>
        </div>
    );
};

export default SidebarLeft;
