import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({showSidebarRight, onToolbarItemClick, toolbarActive, ownProps, layers, baseMaps, onChangeActiveBaseMap}) => {
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
                            <ToolbarMenu item={item} active={active} type={type} layers={layers} baseMaps={baseMaps} onChangeActiveBaseMap={onChangeActiveBaseMap}> </ToolbarMenu>
                        </div>)
                })
            }
        </div>
    )
}

export default Toolbar
