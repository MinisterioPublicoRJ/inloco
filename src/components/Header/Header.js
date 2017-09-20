import React from 'react'

const Header = ({onHeaderClick}) => {
    return (
        <div className="application-header">
            <div className="application-header--logo-placeholder">
                <img src={require('../../assets/img/logo.png')} alt="InLoco" className="application-header--logo"/>
            </div>
            <a className="application-header--menu-button fa fa-bars focus-menu" role="button" onClick={onHeaderClick}>
                <span id="menu-button--tootltip" className="menu-button--tootltip">Começe por aqui.</span>
            </a>
        </div>
    )
}

export default Header
