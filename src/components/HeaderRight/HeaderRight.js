import React from 'react'
const aLayerIsSelected = (layers) => {
    if(Array.isArray(layers)){
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i]
            if (layer.selected){
                return true
            }
        }
        return false
    }
}
const HeaderRight = ({layers, onHeaderClick}) => {
    var cssClass = 'header-right'
    if(!aLayerIsSelected(layers)){
        cssClass += ' hidden'
    }
    return (
        <div className={cssClass}>
            <a className="header-right--menu-button fa fa-list-ul" role="button" onClick={onHeaderClick}></a>
        </div>
    )
}

export default HeaderRight
