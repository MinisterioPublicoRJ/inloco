import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({showSidebarRight, toolbarActive, ownProps, layers, places, onToolbarItemClick, onPlaceClick, onOpacityChange}) => {
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
        if(e.target.classList.contains("toolbar-item")){
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
                            <ToolbarMenu item={item} active={active} type={type} layers={layers} places={places} onPlaceClick={onPlaceClick} onOpacityChange={onOpacityChange}> </ToolbarMenu>
                        </div>)
                })
            }
        </div>
    )
}

export default Toolbar
