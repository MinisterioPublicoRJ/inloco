import React from 'react'

const HeaderRight = ({onHeaderClick}) => {
    return (
        <div className="header-right">
            <div className="header-right--logo-placeholder">
                <img src={require('../../assets/img/logo.png')} alt="InLoco" className="header-right--logo"/>
            </div>
            <a className="header-right--menu-button fa fa-bars" role="button" onClick={onHeaderClick}></a>
        </div>
    )
}

export default HeaderRight
