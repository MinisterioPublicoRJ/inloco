import React from 'react'

const PlatformToolbar = ({showSidebarRight, ownProps}) => {
    let className
    let { type, items } = ownProps
    if(type === "platform"){
        className = 'platform-toolbar'
    }
    if(type === "map"){
        className = 'map-toolbar'
    }
    console.log(type)
    console.log(items)
    if(showSidebarRight){
        className += " sidebar-left-opened"
    }
    return (
        <div className={className}>
            <div className="toolbar-item fa fa-search" > </div>
            <div className="toolbar-item fa fa-square-o" > </div>
            <div className="toolbar-item fa fa-pencil" > </div>
            <div className="toolbar-item fa fa-share-alt" > </div>
            <div className="toolbar-item fa fa-download" > </div>
        </div>
    )
}

export default PlatformToolbar
