import React from 'react';

const MenuHeader = ({hideMenu}) => {
    return (
        <div className="menu-header">
            <img src={require('../../assets/img/logo.png')} alt="InLoco" className="menu-header--logo"/>
            <a role="button" className="menu-header--button fa fa-times" onClick={hideMenu}></a>
            <h1 className="menu-header--title">
                Camadas de Exibição
                <small className="menu-header--caption">Escolha uma categoria abaixo</small>
            </h1>
        </div>
    );
};

export default MenuHeader;
