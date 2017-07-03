import React from 'react'

const HeaderRight = ({onHeaderClick}) => {
    return (
        <div className="header-right">
            <a className="header-right--menu-button fa fa-list-ul" role="button" onClick={onHeaderClick}></a>
        </div>
    )
}

export default HeaderRight
