import React from 'react'

const PlatformToolbar = ({showSidebarRight}) => {
    var className = 'platform-toolbar'
    console.log(showSidebarRight)
    if(showSidebarRight){
        className += " sidebar-left-opened"
    }
    return (
        <div className={className}>

        </div>
    )
}

export default PlatformToolbar
