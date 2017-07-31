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
    if(!items){
        return null
    }
    if(showSidebarRight){
        className += " sidebar-left-opened"
    }
    return (
        <div className={className}>
            {
                items.map( (item, index) => {
                    var itemClassName = "toolbar-item " + item.className
                    return (<div key={index} className={itemClassName} > </div>)
                })
            }
        </div>
    )
}

export default PlatformToolbar
