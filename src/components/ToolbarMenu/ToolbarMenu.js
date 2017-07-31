import React from 'react'

const ToolbarMenu = ({ item, active, type, onToolbarMenuClose }) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if(!active || active !== item.name) {
        className += " hidden"
    }

    function handleItemClick (e) {
        onToolbarMenuClose()
    }

    return (
        <div className={className}>
            <div className="fa fa-close" onClick={handleItemClick}></div>
        </div>
    )
}

export default ToolbarMenu
