import React from 'react'

const LayerStyleItem = ({layer, style, index, onStyleClick}) => {

    function styleClick() {
        return onStyleClick(layer, index)
    }

    return (
        <li
            className="layer-styles-carousel--list-item"
            onClick={styleClick}
        >
            <img className="layer-styles-carousel--image" src={style.thumb} alt={style.title}/>
        </li>
    )
}

export default LayerStyleItem
