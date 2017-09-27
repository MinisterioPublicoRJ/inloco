import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({
    showSidebarRight,
    toolbarActive,
    ownProps,
    layers,
    places,
    mapProperties,
    baseMaps,
    onToolbarItemClick,
    onPlaceClick,
    onOpacityChange,
    onContourChange,
    onKeyUpSearch,
    onChangeActiveBaseMap,
}) => {
    let className
    let tooltipClassName = 'tooltip'
    let active
    let { type, items } = ownProps

    if(type === "platform"){
        className = 'platform-toolbar'
        tooltipClassName += ' bottom'
    }
    if(type === "map"){
        className = 'map-toolbar'
        tooltipClassName += ' top'
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
                    if (active === item.name) {
                        itemClassName += " active"
                    }

                    // focus on searchStreet box manually
                    if (item.name === 'searchStreet' && active === 'searchStreet') {
                        setTimeout(() => {
                            document.getElementById("GooglePlacesSearch").focus()
                        }, 200)
                    }

                    return (
                        <div data-id={item.name} key={index} className={itemClassName} onClick={(e) => handleClick(e)}>
                            <ToolbarMenu
                                item={item}
                                active={active}
                                type={type}
                                layers={layers}
                                places={places}
                                baseMaps={baseMaps}
                                mapProperties={mapProperties}
                                onChangeActiveBaseMap={onChangeActiveBaseMap}
                                onPlaceClick={onPlaceClick}
                                onOpacityChange={onOpacityChange}
                                onContourChange={onContourChange}
                                onKeyUpSearch={onKeyUpSearch}
                            >
                            </ToolbarMenu>
                            <span className={tooltipClassName}>{item.tooltip}</span>
                        </div>)
                })
            }
        </div>
    )
}

export default Toolbar
