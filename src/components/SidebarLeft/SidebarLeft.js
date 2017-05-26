import React from 'react';
import MenuContainer from '../Menu/MenuContainer.js';
import SearchLayer from '../SearchLayer/SearchLayer.js';
import Measure from 'react-measure';

const SidebarLeft = ({searchLayer}) => {
    return (
        <Measure>
            {({width}) =>
                <div className="sidebar-left">
                    <img src={require('../../assets/img/logo.png')} alt="InLoco" className="sidebar-left--logo"/>
                    <h1 className="sidebar-left--title">
                        Camadas de Exibição
                        <small className="sidebar-left--caption">Escolha uma categoria abaixo</small>
                    </h1>
                    <MenuContainer sidebarLeftWidth={width}/>
                    <SearchLayer searchLayer={searchLayer}/>
                </div>
            }
        </Measure>
    );
};

export default SidebarLeft;
