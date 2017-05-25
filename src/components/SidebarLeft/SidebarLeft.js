import React from 'react';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';

const SidebarLeft = ({searchLayer}) => {
    return (
        <div className="sidebar-left">
            <img src={require('../../assets/img/logo.png')} alt="InLoco" className="sidebar-left--logo"/>
            <h1 className="sidebar-left--title">
                Camadas de Exibição
                <small className="sidebar-left--caption">Escolha uma categoria abaixo</small>
            </h1>
            <MenuContainer/>
            <SearchLayer searchLayer={searchLayer}/>
        </div>
    );
};

export default SidebarLeft;
