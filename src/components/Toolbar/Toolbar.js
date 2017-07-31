import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({showSidebarRight, onToolbarItemClick, onToolbarMenuClose, toolbarActive, ownProps}) => {
    let className
    let active
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

    if(toolbarActive){
        active = toolbarActive
    }

    function handleClick(e){
        console.log(e.target)
        if(e.target.dataset.id){

            onToolbarItemClick(e.target.dataset.id)
        }
    }
    return (
        <div className={className}>
            {
                items.map( (item, index) => {
                    var itemClassName = "toolbar-item " + item.className
                    if(active === item.name) {
                        itemClassName += " active"
                    }

                    return (
                        <div data-id={item.name} key={index} className={itemClassName} onClick={(e) => handleClick(e)}>
                            <ToolbarMenu item={item} active={active} type={type} onToolbarMenuClose={onToolbarMenuClose}> </ToolbarMenu>
                        </div>)
                })
            }
        </div>
    )
}

export default Toolbar
