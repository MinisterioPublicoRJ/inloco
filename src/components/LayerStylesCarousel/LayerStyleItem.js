import React from 'react'

const LayerStyleItem = ({layer, style, index, onStyleClick}) => {

    let itemClassName = 'layer-styles-carousel--list-item'
    if (layer.selectedLayerStyleId === index) {
        itemClassName += ' selected'
    }

    function styleClick() {
        return onStyleClick(layer, index)
    }

    return (
        <li
            className={itemClassName}
            onClick={styleClick}
        >
            <img className="layer-styles-carousel--image" src={style.thumb} alt={style.title}/>
        </li>
    )
}

export default LayerStyleItem
