import React from 'react'
import ExportList from '../ExportList/ExportList'
import GlobalFilter from '../GlobalFilter/GlobalFilter'

const ToolbarMenu = ({ item, active, type, layers, places, onPlaceClick }) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if((!active || active !== item.name) || item.name === "draw" ) {
        className += " hidden"
    }

    return (
        <div className={className}>
            {
                item.name === 'download'
                ? <ExportList layers={layers}/>
                : ''
            }
            {
                item.name === 'search'
                ? <GlobalFilter onPlaceClick={onPlaceClick} places={places}/>
                : ''
            }
        </div>
    )
}

export default ToolbarMenu
