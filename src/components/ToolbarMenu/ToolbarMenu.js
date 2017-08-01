import React from 'react'
import ExportList from '../ExportList/ExportList'

const ToolbarMenu = ({ item, active, type, layers }) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if(!active || active !== item.name) {
        className += " hidden"
    }

    return (
        <div className={className}>
            {
                item.name === 'download'
                ? <ExportList layers={layers}/>
                : ''
            }
        </div>
    )
}

export default ToolbarMenu
