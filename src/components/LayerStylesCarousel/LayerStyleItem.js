import React from 'react'

const LayerStyleItem = ({layer, style, index, onStyleClick, onStyleMouseOver, onStyleMouseOut}) => {

    let itemClassName = 'layer-styles-carousel--list-item'
    if (layer && layer.selectedLayerStyleId === index) {
        itemClassName += ' selected'
    }

    function styleClick() {
        return onStyleClick(layer, index)
    }

    function styleMouseOver() {
        return onStyleMouseOver(layer, index)
    }

    function styleMouseOut() {
        return onStyleMouseOut(layer, index)
    }

    return (
        <li
            className={itemClassName}
            onClick={styleClick}
        >
            { style ?
                <img
                    className="layer-styles-carousel--image"
                    src={style.thumb}
                    alt={style.title}
                    onMouseOver={styleMouseOver}
                    onMouseOut={styleMouseOut}
                />
            : '' }
        </li>
    )
}

export default LayerStyleItem
