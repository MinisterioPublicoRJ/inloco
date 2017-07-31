import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({showSidebarRight, ownProps}) => {
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

    function handleClick(e){
        console.log("clicou")
        console.log(e.target.dataset.id)
    }
    return (
        <div className={className}>
            {
                items.map( (item, index) => {
                    var itemClassName = "toolbar-item " + item.className
                    return (
                        <div data-id={item.name} key={index} className={itemClassName} onClick={(e) => handleClick(e)}>
                            <ToolbarMenu item={item} active={active}> </ToolbarMenu>
                        </div>)
                })
            }
        </div>
    )
}

export default Toolbar
