import React from 'react'

const ToolbarMenu = (ownProps) => {
    console.log(ownProps)
    let className = "toolbar-menu hidden"
    let { item } = ownProps
    console.log(item)

    return (
        <div className={className}>
        </div>
    )
}

export default ToolbarMenu
