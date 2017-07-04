import React from 'react'

/**
 * @param {Object[]} layers - this is array of layers.
 *
 * This function loops through all layers in the state
 * and returns true if at leas one layer is selected
 *
 * @return {boolean} - returns true if at least one layer
 * is selected, and false if none is selected.
 */
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
