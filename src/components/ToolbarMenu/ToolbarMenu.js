import React from 'react'
import ExportList from '../ExportList/ExportList'
import BaseMapList from '../BaseMapList/BaseMapList'

const ToolbarMenu = ({ item, active, type, layers, baseMaps, onChangeActiveBaseMap }) => {
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
                item.name === 'basemaps'
                ? <BaseMapList baseMaps={baseMaps} onChangeActiveBaseMap={onChangeActiveBaseMap} />
                : ''
            }
        </div>
    )
}

export default ToolbarMenu
