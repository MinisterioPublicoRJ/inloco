import React from 'react'

const ToolbarMenu = ({ item, active, type }) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if(!active || active !== item.name) {
        className += " hidden"
    }

    return (
        <div className={className}>
        </div>
    )
}

export default ToolbarMenu
