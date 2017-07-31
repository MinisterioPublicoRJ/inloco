import React from 'react'

const ToolbarMenu = (ownProps) => {
    let className = "toolbar-menu"
    let { item, active } = ownProps
    console.log(item)
    console.log(active)

    if(!active || active !== item.name) {
        className += " hidden"
    }
    console.log(className)
    return (
        <div className={className}>
        </div>
    )
}

export default ToolbarMenu
