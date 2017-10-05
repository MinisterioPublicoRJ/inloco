import React from 'react'

const Header = ({onHeaderClick, showTooltipMenu}) => {
    let className = "menu-button--tootltip"
    if (!showTooltipMenu) {
        className += " hidden"
    }
    return (
        <div className="application-header">
            <div className="application-header--logo-placeholder">
            <a href="http://apps.mprj.mp.br/sistema/mpmapas/home.html" target="_blank">
                <img src={require('../../assets/img/logo.png')} alt="InLoco" className="application-header--logo"/>
            </a>
            </div>
            <a className="application-header--menu-button fa fa-bars focus-menu" role="button" onClick={onHeaderClick} data-html2canvas-ignore={true}>
                <span className={className}>Comece por aqui.</span>
            </a>
        </div>
    )
}

export default Header
